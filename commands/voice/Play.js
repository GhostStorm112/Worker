const Command = require('../structures/Command')

class Play extends Command {
  get name () {
    return 'play'
  }

  get aliases () {
    return ['play']
  }

  async run (event, args) {
    const guild_id = event.guild_id
    args = args.trim()

    this.client.lavalink.players.get(guild_id).join('268807882059939841')
    const songs = await this.client.lavalink.load(args)
    this.client.lavalink.players.get('268807882059939840').play(songs[0].track)
    return this.client.rest.channel.createMessage(event.channel_id, args || 'playing')
  }
}

module.exports = Play
