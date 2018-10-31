const Command = require('../../structures/Command')

class Play extends Command {
  get name () {
    return 'play'
  }
  get info () {
    return 'Plays a song or queus it if a song is already playing'
  }

  get usage () {
    return "play <song>"
  }
  get aliases () {
    return ['']
  }
  get allowPM () {
    return false
  }

  async run (event, args) {
    
    this.client.log.debug('Play', `Running for shard ${event.shard_id}`)

    if (!args) return this.client.rest.channel.createMessage(event.channel_id, 'What do you think I am a song tree?')
    args = args.trim()
    let data

    const userVoiceChannel = await this.client.cache.guilds[event.guild_id].voice_states.get(event.author.id)
    const selfVoiceChannel = await this.client.cache.guilds[event.guild_id].voice_states.get(process.env.BOT_ID)

    if (!userVoiceChannel || !userVoiceChannel.channel_id) {
      this.client.log.debug('Play', 'User not in voice channel')
      return this.client.rest.channel.createMessage(event.channel_id, 'I know you wanna jam! But please join a voice channel first.')
    }

    if (userVoiceChannel && userVoiceChannel.channel_id) {
      if (selfVoiceChannel && selfVoiceChannel.channel_id) {
        if (userVoiceChannel.channel_id !== selfVoiceChannel.channel_id) {
          this.client.log.debug('Play', 'Tried to play in another channel while playing')

          return this.client.rest.channel.createMessage(event.channel_id, 'Look don\'t be that guy.')
        }
      }
    }

    if (!selfVoiceChannel || !selfVoiceChannel.channel_id) {
      this.client.log.debug('Play', `Joining channel ${userVoiceChannel.channel_id}`)
      await this.client.shard.sendWS(event.gateway, 'VOICE_STATE_UPDATE', { shard_id: event.shard_id, guild_id: event.guild_id, channel_id: userVoiceChannel.channel_id, self_mute: false, self_deaf: false })
    }

    try {
      try {
        data = await this.client.lavalink.load(`${args}`)
        if (data.loadType === 'NO_MATCHES') throw new Error()
      } catch (error) {
        data = (await this.client.lavalink.load(`ytsearch:${args}`))
        if (data.loadType === 'NO_MATCHES') throw new Error()
      }
    } catch (error) {
      return this.client.rest.channel.createMessage(event.channel_id, 'What ever you did it didn\'t work')
    }

    this.client.log.debug('Play', `Playing in ${event.guild_id} on ${event.shard_id}`)
    this.client.shard.sendWS(event.gateway, 'LAVALINK', { action: 'PLAY', shard_id: event.shard_id, guild_id: event.guild_id, track: data.tracks[0].track })

    return this.client.rest.channel.createMessage(event.channel_id, {
      embed: {
        author: {
          name: `${event.author.username}#${event.author.discriminator} (${event.author.id})`,
          icon_url: `https://cdn.discordapp.com/avatars/${event.author.id}/${event.author.avatar}.webp`
        },
        description: `**Queued:** [${data.tracks[0].info.title}](${data.tracks[0].info.uri})`
      }
    })
  }
}

module.exports = Play
