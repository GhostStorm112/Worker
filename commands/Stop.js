const Command = require('../structures/Command')

class Stop extends Command {
  get name () {
    return 'stop'
  }

  get aliases () {
    return ['st']
  }

  async run (event, args) {
    this.client.shard.sendWS(0, 'LSTOP', {action: 'STOP', guild_id: event.guild_id})
    return this.client.rest.channel.createMessage(event.channel_id, 'Stopping the music')
  }
}

module.exports = Stop
