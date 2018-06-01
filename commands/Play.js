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
    let status = 'Now playing:'
    const queue = await this.client.lavalink.queues.get(event.guild_id)
    const songs = await this.client.lavalink.load(`ytsearch:${args}`)
    const song = songs[0]
    
    console.log(event.shard_id)
    this.client.shard.sendWS(event.shard_id, 'VOICE_STATE_UPDATE', { guild_id: event.guild_id, channel_id: '268807882059939841', self_mute: false, self_deaf: false })
    this.client.shard.sendWS(event.shard_id, 'LAVALINK', {action: 'PLAY', guild_id: event.guild_id, song: song.track})
    if (queue.player.playing) { status = 'Queued:' }

    return this.client.rest.channel.createMessage(event.channel_id, {
      embed: {
        author: {
          name: `${event.author.username}#${event.author.discriminator} (${event.author.id})`,
          icon_url: `https://cdn.discordapp.com/avatars/${event.author.id}/${event.author.avatar}.webp`
        },
        description: `
          **${status}** [${song.info.title}](${song.info.uri})
        `
      }
    })
  }
}

module.exports = Play
