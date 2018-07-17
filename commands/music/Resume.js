const Command = require('../../structures/Command')

class Resume extends Command {
  get name () {
    return 'resume'
  }

  get aliases () {
    return ['rs']
  }

  async run (event, args) {
    console.log(event.shard_id)
    this.client.shard.sendWS(event.shard_id, 'LAVALINK', {action: 'RESUME', guild_id: event.guild_id})
    return this.client.rest.channel.createMessage(event.channel_id, 'Resumming the music')
  }
}

module.exports = Resume
