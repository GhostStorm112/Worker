const Command = require('../structures/Command')

class Play extends Command {
  get name () {
    return 'play'
  }

  get aliases () {
    return ['play']
  }

  async run (event, args) {
    return this.client.rest.channel.createMessage(event.channel_id, args || 'playing')
  }
}

module.exports = {Play}
