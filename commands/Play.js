const Command = require('../structures/Command')

class Play extends Command {
  get name () {
    return 'play'
  }

  get aliases () {
    return ['test']
  }

  async run (event, args) {
    args = args.trim()
    console.log(args)
    
    console.log('join')
    let data = {
      t: 'VOICE_STATE_UPDATE',
      d: { guild_id: event.guild_id, channel_id: '268807882059939841', self_mute: false, self_deaf: false }
    }
    // var queue = await this.lavalink.queues.get(event.d.guild_id)
    var songs = await this.client.lavalink.load(`ytsearch:${args}`)
    var song = songs[0]
    console.log(song)
    this.client.shard.sendWS(0, data.t, data.d)
    this.client.shard.sendWS(0, 'LAVALINK', {action: 'PLAY', guild_id: event.guild_id, song: song.track})

    return this.client.rest.channel.createMessage(event.channel_id, {
      embed: {
        author: {
          name: `${event.author.username}#${event.author.discriminator} (${event.author.id})`,
          icon_url: `https://cdn.discordapp.com/avatars/${event.author.id}/${event.author.avatar}.webp`
        },
        description: `
          **Now playing:** [${song.info.title}](${song.info.uri})
        `
      }
    })
  }
}

module.exports = Play
