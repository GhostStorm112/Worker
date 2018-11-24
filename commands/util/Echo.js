const Command = require('../../structures/Command')

class Echo extends Command {
  constructor(client){
    super(client, {
      name: 'echo',
      aliases: 'say',
      description: 'Echos what you want it to',
    
    })
  }
  async run (event, args) {
    args = args.trim()
    return this.client.rest.channel.createMessage(event.channel_id, args || 'echo!')
  }
}

module.exports = Echo
