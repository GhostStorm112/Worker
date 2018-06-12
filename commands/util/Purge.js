const Command = require('../../structures/Command')

class Purge extends Command {
  get name () {
    return 'purge'
  }

  get aliases () {
    return ['clear']
  }

  async run (event, args) {
    if (!this.client.isOwner(event.author.id)) { return }

    args = args.trim()

    const messages = await this.client.rest.channel.getChannelMessages(event.channel_id, { limit: args || 2 })
    let purge = []
    for (var message in messages) {
      purge.push(messages[message].id)
    }
    this.client.rest.channel.bulkDeleteMessages(event.channel_id, purge.reverse())
  }
}

module.exports = Purge
