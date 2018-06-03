const Command = require('../../structures/Command')

class Resume extends Command {
  get name () {
    return 'resume'
  }

  get aliases () {
    return ['rs']
  }

  async run (event, args) {
    this.client.shard.sendWS(0, 'LAVALINK', {action: 'RESUME', guild_id: event.guild_id})
    return this.client.rest.channel.createMessage(event.channel_id, 'Resumming the music')
  }
}

module.exports = Resume
