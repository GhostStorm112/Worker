const Command = require('../structures/Command')

class Leave extends Command {
  get name () {
    return 'leave'
  }

  get aliases () {
    return ['le']
  }

  async run (event, args) {
    this.client.shard.sendWS(0, 'LAVALINK', {action: 'LEAVE', guild_id: event.guild_id, channel_id: '268807882059939841'})
    return this.client.rest.channel.createMessage(event.channel_id, 'Party later?')
  }
}

module.exports = Leave
