const Command = require('../../structures/Command')

class Play extends Command {
  get name () {
    return 'play'
  }
  get info () {
    return 'Plays a song or queus it if a song is already playing'
  }

  get usage () {

  }
  get aliases () {
    return ['test']
  }

  async run (event, args) {
    if (!args) return this.client.rest.channel.createMessage(event.channel_id, 'What do you think I am a song tree?')
    args = args.trim()
    let data

    const userVoiceChannel = await this.client.cache.guilds[event.guild_id].voice_states.get(event.author.id)
    const selfVoiceChannel = await this.client.cache.guilds[event.guild_id].voice_states.get(process.env.BOT_ID)

    if (!userVoiceChannel || !userVoiceChannel.channel_id) {
      return this.client.rest.channel.createMessage(event.channel_id, 'I know you wanna jam! But please join a voice channel first.')
    }

    if (userVoiceChannel && userVoiceChannel.channel_id) {
      if (selfVoiceChannel && selfVoiceChannel.channel_id) {
        if (userVoiceChannel.channel_id !== selfVoiceChannel.channel_id) {
          return this.client.rest.channel.createMessage(event.channel_id, 'Look don\'t be that guy.')
        }
      }
    }

    if (!selfVoiceChannel || !selfVoiceChannel.channel_id) {
      await this.client.shard.sendWS(event.shard_id, 'VOICE_STATE_UPDATE', { shard_id: event.shard_id, guild_id: event.guild_id, channel_id: userVoiceChannel.channel_id, self_mute: false, self_deaf: false })
    }
    try {
      try {
        data = await this.client.lavalink.load(`${args}`)
        if (!data || !data.length) throw new Error()
      } catch (error) {
        data = (await this.client.lavalink.load(`ytsearch:${args}`))
      }
    } catch (error) {
      return this.client.rest.createMessage(event.channel_id, 'What ever you did it didn\'t work')
    }
    console.log(userVoiceChannel)
    this.client.shard.sendWS(event.shard_id, 'VOICE_STATE_UPDATE', { shard_id: event.shard_id, guild_id: event.guild_id, channel_id: userVoiceChannel.channel_id, self_mute: false, self_deaf: false })
    this.client.shard.sendWS(event.shard_id, 'LAVALINK', {action: 'PLAY', guild_id: event.guild_id, song: data[0].track})

    return this.client.rest.channel.createMessage(event.channel_id, {
      embed: {
        author: {
          name: `${event.author.username}#${event.author.discriminator} (${event.author.id})`,
          icon_url: `https://cdn.discordapp.com/avatars/${event.author.id}/${event.author.avatar}.webp`
        },
        description: `**Queued:** [${data[0].info.title}](${data[0].info.uri})`
      }
    })
  }
}

module.exports = Play
