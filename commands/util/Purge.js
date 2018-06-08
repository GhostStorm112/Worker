const Command = require('../../structures/Command')

class Purge extends Command {
  get name () {
    return 'purge'
  }

  get aliases () {
    return ['clear']
  }

  async run (event, args) {
    args = args.trim()
    let messages = this.client.rest.channel.getChannelMessages(event.channel_id, { limit: 20 })
  }
}

module.exports = Purge
