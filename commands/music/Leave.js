const Command = require('../../structures/Command')

class Leave extends Command {
  get name () {
    return 'leave'
  }

  get aliases () {
    return ['le']
  }

  async run (event, args) {
    console.log(event.shard_id)
    this.client.shard.sendWS(event.shard_id, 'LAVALINK', {
      shard_id: event.shard_id,
      action: 'LEAVE',
      guild_id: event.guild_id,
      channel_id: null,
      self_mute: false,
      self_deaf: false
    }
    )
    return this.client.rest.channel.createMessage(event.channel_id, 'Party later?')
  }
}

module.exports = Leave
