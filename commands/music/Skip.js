const Command = require('../../structures/Command')

class Skip extends Command {
  constructor(client){
    super(client, {
      name: 'skip',
      aliases: 'sk',
      description: 'Skips a song',
      guildOnly: true,
    })
  }
  
  async run (event, args) {
    this.client.shard.sendWS(event.gateway, 'LAVALINK', { action: 'SKIP', guild_id: event.guild_id })
    return this.client.rest.channel.createMessage(event.channel_id, 'Skipping song')
  }
}

module.exports = Skip
