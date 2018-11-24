const Command = require('../../structures/Command')

class Shutdown extends Command {
  constructor(client){
    super(client, {
      name: 'shutdown',
      description: 'Shutdown the bot',
    })
  }

  async run (event, args) {
    if (!this.client.isOwner(event.author.id)) { return }

    this.client.shard.sendWS('SHUTDOWN', '')
    return this.client.rest.channel.createMessage(event.channel_id, 'Bot shutdown started')
  }
}

module.exports = Shutdown
