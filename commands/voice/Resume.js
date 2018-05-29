const Command = require('../structures/Command')

class Echo extends Command {
  get name () {
    return 'echo'
  }

  get aliases () {
    return ['say']
  }

  async run (event, args) {
    console.log(`ECHO -> ${args}`)

    args = args.trim()
    return this.client.rest.channel.createMessage(event.channel_id, args || 'echo!')
  }
}

module.exports = Echo
