const Command = require('../../structures/Command')

class Resume extends Command {
  get name () {
    return 'resume'
  }

  get aliases () {
    return ['rs']
  }

  async run (event, args) {
    const userVoiceChannel = await this.client.cache.guilds[event.guild_id].voice_states.get(event.author.id)
    const selfVoiceChannel = await this.client.cache.guilds[event.guild_id].voice_states.get(process.env.BOT_ID)

    if (!selfVoiceChannel || !selfVoiceChannel.channel_id) {
      this.client.log.debug('Play', `Joining channel ${userVoiceChannel.channel_id}`)
      this.client.shard.sendWS(event.gateway, 'VOICE_STATE_UPDATE', { shard_id: event.shard_id, guild_id: event.guild_id, channel_id: userVoiceChannel.channel_id, self_mute: false, self_deaf: false })
    }
    this.client.shard.sendWS(event.gateway, 'LAVALINK', { action: 'RESUME', guild_id: event.guild_id })
    return this.client.rest.channel.createMessage(event.channel_id, 'Resumming the music')
  }
}

module.exports = Resume
