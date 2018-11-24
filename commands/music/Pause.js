const Command = require('../../structures/Command')

class Pause extends Command {
  constructor(client){
    super(client, {
      name: 'pause',
      aliases: 'pp',
      description: 'Pauses the music',
      guildOnly: true,
    })
  }
  
  async run (event, args) {
    this.client.shard.sendWS(event.gateway, 'LAVALINK', { action: 'PAUSE', guild_id: event.guild_id })
    return this.client.rest.channel.createMessage(event.channel_id, 'Pausing the music')
  }
}

module.exports = Pause
