const Command = require('../../structures/Command')

class Pause extends Command {
  get name () {
    return 'pause'
  }

  get aliases () {
    return ['pp']
  }

  async run (event, args) {
    this.client.shard.sendWS(event.shard_id, 'LAVALINK', {action: 'PAUSE', guild_id: event.guild_id})
    return this.client.rest.channel.createMessage(event.channel_id, 'Pausing the music')
  }
}

module.exports = Pause
