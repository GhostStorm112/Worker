const EventHandler = require('../structures/EventHandler')
const promisifyAll = require('tsubaki').promisifyAll
const { readdirSync, statSync } = promisifyAll(require('fs'))
const path = require('path')
const StatsD = require('hot-shots')

class CommandHandler extends EventHandler {
  constructor (client) {
    super(client)
    this.commandPath = path.join(__dirname, '../commands/')
    this.prefix = process.env.PREFIX
    this.mentionRegex = new RegExp(`<@${process.env.BOT_ID}>`)

    this.commands = new Map()
    this.help = new Map()
    this.groups = new Map()
  }

  get name () {
    return 'commands'
  }

  get canHandle () {
    return ['messageCreate']
  }

  async init () {
    // Setup StatsD
    if (process.env.STATSD) {
      this.statsClient = new StatsD({
        host: process.env.STATSD_HOST,
        port: process.env.STATSD_PORT,
        prefix: process.env.STATSDW_PREFIX,
        telegraf: true
      })
    }
    return this.loadCommands()
  }

  async handle (event) {
    try {
      console.time('Command execution')
      if (event.author.bot || event.author.id === process.env.BOT_ID) { return }

      let command
      if (this.mentionRegex.test(event.content)) { command = event.content.replace(/^[^ ]+ /, '').trim() } else if (event.content.startsWith(this.prefix)) { command = event.content.substring(this.prefix.length).trim() } else { return }

      if (!command) { return }
      const commandName = command.match(/^[^ ]+/)[0].toLowerCase()
      if (commandName === 'help') { return this.sendCHelp(event, command.substring(commandName.length + 1)) }
      let matched = this.commands.get(commandName)

      let setting = await this.client.settings.getSetting('blacklist', event.guild_id)
      if (setting != null) {
        if (Object.values(setting.data).indexOf(event.author.id) > -1) { return }
      }
      if (matched) {
        if (this.statsClient) {
          this.statsClient.increment('workercommand', 1, 1, [`command:${commandName}`], (err) => {
            if (err) {
              console.log(err)
            }
          })
        }
        console.timeEnd('Command execution')
        return matched.run(event, command.substring(commandName.length + 1))
      }

      for (const c of this.commands.values()) {
        if (c.aliases && c.aliases.includes(commandName)) {
          if (this.statsClient) {
            this.statsClient.increment('workercommand', 1, 1, [`command:${commandName}`], (err) => {
              if (err) {
                console.log(err)
              }
            })
          }
          console.timeEnd('Command execution')
          return c.run(event, command.substring(commandName.length + 1))
        }
      }

      return
    } catch (error) {
      console.error(error)
    }
  }
  async sendCHelp (event, command) {
    if (command) {
      if (this.help.get(command.toLowerCase())) {
        return this.client.rest.channel.createMessage(event.channel_id, `Command usage: ${this.help.get(command.toLowerCase())}`)
      } else {
        return this.client.rest.channel.createMessage(event.channel_id, `Hmm... I don't know that command`)
      }
    } else {
      this.commands.get('help').run(event, '', this.groups)
    }
  }
  async loadCommands () {
    const files = readdirSync(this.commandPath)
    for (let file of files) {
      file = path.join(this.commandPath, file)
      const stats = statSync(file)
      if (path.extname(file) === '.js' && !stats.isDirectory()) {
        const command = new (require(file))(this)
        this.groups.set(command.name, path.dirname(file).split(path.sep).pop())
        this.commands.set(command.name, command)
        this.help.set(command.name, command.usage)
      } else if (stats.isDirectory()) {
        this.loadCommandsIn(file)
      }
    }
  }

  async loadCommandsIn (dir) {
    const files = await readdirSync(dir)
    for (let file of files) {
      file = path.join(dir, file)
      const stats = statSync(file)
      if (path.extname(file) === '.js' && !stats.isDirectory()) {
        const command = new (require(file))(this)
        this.groups.set(command.name, path.dirname(file).split(path.sep).pop())
        this.commands.set(command.name, command)
        this.help.set(command.name, command.help)
      }
    }
  }

  async loadedCommands () {
    return this.commands.size
  }
}

module.exports = CommandHandler
