const Command = require('../../structures/Command')

class Stop extends Command {
  get name () {
    return 'stop'
  }

  get aliases () {
    return ['st']
  }

  async run (event, args) {
    this.client.shard.sendWS(event.shard_id, 'LAVALINK', {action: 'STOP', guild_id: event.guild_id})
    return this.client.rest.channel.createMessage(event.channel_id, 'Stopping the music')
  }
}

module.exports = Stop
