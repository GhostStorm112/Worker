const Command = require('../../structures/Command')

class Leave extends Command {
  constructor(client){
    super(client, {
      name: 'leave',
      description: 'Makes the bot leave the channel',
      guildOnly: true,
    })
  }
  
  async run (event, args) {
    this.client.shard.sendWS(event.gateway, 'LAVALINK', { action: 'STOP', guild_id: event.guild_id })
    this.client.shard.sendWS(event.gateway, 'W_VOICE_STATE_UPDATE', { shard_id: event.shard_id, guild_id: event.guild_id, channel_id: null, self_mute: false, self_deaf: false })

    return this.client.rest.channel.createMessage(event.channel_id, 'Stopping the music')
  }
}

module.exports = Leave
