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

    if (!this.client.isOwner(event.author.id)) { return }
    if (isNaN(args) || !args) {
      this.client.rest.channel.createMessage(event.channel_id, 'You need to specify a number > 2')
    } else {
      const messages = await this.client.rest.channel.getChannelMessages(event.channel_id, { limit: args })
      const purge = []
      for (const message in messages) {
        purge.push(messages[message].id)
      }
      this.client.rest.channel.bulkDeleteMessages(event.channel_id, purge.reverse())
    }
  }
}

module.exports = Purge
