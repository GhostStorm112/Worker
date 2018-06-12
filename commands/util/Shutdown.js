const Command = require('../../structures/Command')

class Shutdown extends Command {
  get name () {
    return 'shutdown'
  }

  get aliases () {
    return ['sh']
  }

  async run (event, args) {
    if (!this.client.isOwner(event.author.id)) { return }

    console.log(`ECHO -> ${args}`)
    this.client.shard.sendWS('SHUTDOWN', '')
    return this.client.rest.channel.createMessage(event.channel_id, 'Bot shutdown started')
  }
}

module.exports = Shutdown
