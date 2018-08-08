const EventHandler = require('../structures/EventHandler')
const promisifyAll = require('tsubaki').promisifyAll
const { readdirSync, statSync } = promisifyAll(require('fs'))
const path = require('path')
const StatsD = require('hot-shots')

class CommandHandler extends EventHandler {
  constructor (client) {
    super(client)
    this.commandPath = path.join(__dirname, '../commands/')
    this.inhibitorPath = path.join(__dirname, '../commandInhibitors')
    this.prefix = process.env.PREFIX
    this.mentionRegex = new RegExp(`<@${process.env.BOT_ID}>`)

    this.commands = new Map()
    this.inhibitors = new Map()
    this.help = new Map()
  }

  get name () {
    return 'commands'
  }

  get canHandle () {
    return ['MESSAGE_CREATE']
  }

  async init () {
    // Setup StatsD
    if (process.env.STATSD) {
      this.client.log.debug('StatsD', `Connecting to stats server`)

      this.statsClient = new StatsD({
        host: process.env.STATSD_HOST,
        port: process.env.STATSD_PORT,
        prefix: process.env.STATSDW_PREFIX,
        telegraf: true
      })
    }
    this.loadInhibitors()
    this.loadCommands()
  }

  async handle (event) {
    try {
      console.time('command')
      if (event.author.bot || event.author.id === process.env.BOT_ID) { return }

      let command
      if (this.mentionRegex.test(event.content)) { command = event.content.replace(/^[^ ]+ /, '').trim() } else if (event.content.startsWith(this.prefix)) { command = event.content.substring(this.prefix.length).trim() } else { return }

      if (!command) { return }

      const commandName = command.match(/^[^ ]+/)[0].toLowerCase()
      let matched = this.commands.get(commandName)
      let reason = this.runInhibitors(event, commandName)
      if (await reason) {
        console.timeEnd('command')
        return this.client.rest.channel.createMessage(event.channel_id, await reason)
      }

      if (matched) {
        if (commandName === 'help' && command.substring(commandName.length + 1)) {
          console.timeEnd('command')
          this.statsClient.increment('command', 1, 1, [`command:${commandName}`, `guild:${event.guild_id}`], (err) => {
            if (err) {
              console.log(err)
            }
          })
          return matched.run(event, command.substring(commandName.length + 1), this.commands)
        } else {
          console.timeEnd('command')
          this.statsClient.increment('command', 1, 1, [`command:${commandName}`, `guild:${event.guild_id}`], (err) => {
            if (err) {
              console.log(err)
            }
          })
          return matched.run(event, command.substring(commandName.length + 1))
        }
      }
      for (const c of this.commands.values()) {
        if (c.aliases && c.aliases.includes(commandName)) {
          console.timeEnd('command')
          return c.run(event, command.substring(commandName.length + 1))
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  async runInhibitors (event, commandName) {
    let reason
    this.inhibitors.forEach(inhibitor => {
      reason = inhibitor.run(event, commandName).then(_reason => {
        if (_reason !== undefined) {
          return _reason
        }
      })
    })
    return reason
  }
  async loadInhibitors () {
    const files = readdirSync(this.inhibitorPath)
    for (let file of files) {
      file = path.join(this.inhibitorPath, file)
      if (path.extname(file) === '.js') {
        const inhibitor = new (require(file))(this)
        this.inhibitors.set(inhibitor.name, inhibitor)
        this.client.log.debug('Loader', `Inhibitor ${inhibitor.name} loaded`)
      }
    }
  }

  async loadCommands () {
    const files = readdirSync(this.commandPath)
    for (let file of files) {
      file = path.join(this.commandPath, file)
      const stats = statSync(file)
      if (path.extname(file) === '.js' && !stats.isDirectory()) {
        const command = new (require(file))(this)
        this.commands.set(command.name, command)
        this.client.log.debug('Loader', `Command ${command.name} loaded`)
      } else if (stats.isDirectory()) {
        this.loadCommandsIn(file)
      }
    }
  }

  async loadCommandsIn (dir) {
    const files = readdirSync(dir)
    for (let file of files) {
      file = path.join(dir, file)
      const stats = statSync(file)
      if (path.extname(file) === '.js' && !stats.isDirectory()) {
        const command = new (require(file))(this)
        this.commands.set(command.name, command)
        this.client.log.debug('Loader', `Command ${command.name} loaded`)
      }
    }
  }

  async loadedCommands () {
    return this.commands.size
  }
}

module.exports = CommandHandler
