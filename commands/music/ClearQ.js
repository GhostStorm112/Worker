const Command = require('../../structures/Command')

class Echo extends Command {
  get name () {
    return 'echo'
  }

  get aliases () {
    return ['say']
  }

  get allowPM () {
    return false
  }
  
  async run (event, args) {
    args = args.trim()
    return this.client.rest.channel.createMessage(event.channel_id, args || 'echo!')
  }
}

module.exports = Echo
