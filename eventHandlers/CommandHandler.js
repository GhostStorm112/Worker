const EventHandler = require('../structures/EventHandler')
const promisifyAll = require('tsubaki').promisifyAll
const { readdirSync, statSync } = promisifyAll(require('fs'))

const path = require('path')

class CommandHandler extends EventHandler {
  constructor (client) {
    super(client)

    this.commandPath = path.join(__dirname, '../commands/')
    this.prefix = process.env.PREFIX
    this.mentionRegex = new RegExp(`<@${process.env.BOT_ID}>`)

    this.commands = new Map()
  }

  get name () {
    return 'commands'
  }

  get canHandle () {
    return ['messageCreate']
  }

  async init () {
    return this.loadCommands()
  }

  handle (event) {
    try {
      if (event.author.bot || event.author.id === process.env.BOT_ID) { return }

      let command
      if (this.mentionRegex.test(event.content)) { command = event.content.replace(/^[^ ]+ /, '').trim() } else if (event.content.startsWith(this.prefix)) { command = event.content.substring(this.prefix.length).trim() } else { return }

      if (!command) { return }
      const commandName = command.match(/^[^ ]+/)[0].toLowerCase()
      let matched = this.commands.get(commandName)
      console.log(matched.info)
      if (matched) { return matched.run(event, command.substring(commandName.length + 1)) }

      for (const c of this.commands.values()) {
        if (c.aliases && c.aliases.includes(commandName)) { return c.run(event, command.substring(commandName.length + 1)) }
      }

      return
    } catch (error) {
      console.error(error)
    }
  }

  async loadCommands () {
    const files = readdirSync(this.commandPath)

    for (let file of files) {
      file = path.join(this.commandPath, file)
      const stats = statSync(file)
      if (path.extname(file) === '.js' && !stats.isDirectory()) {
        console.log(file)
        const command = new (require(file))(this)
        this.commands.set(command.name, command)
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
        console.log(file)
        const command = new (require(file))(this)
        this.commands.set(command.name, command)
      }
    }
  }
}

module.exports = CommandHandler
