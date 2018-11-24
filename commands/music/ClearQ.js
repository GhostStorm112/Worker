const Command = require('../../structures/Command')

class ClearQ extends Command {
  constructor(client){
    super(client, {
      name: 'clearq',
      aliases: 'clq',
      description: 'Clears the music queue',
      guildOnly: true,
    })
  }
  
  async run (event, args) {
    args = args.trim()
    return this.client.rest.channel.createMessage(event.channel_id, args || 'echo!')
  }
}

module.exports = ClearQ
