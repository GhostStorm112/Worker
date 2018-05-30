const Command = require('../structures/Command')

class Pause extends Command {
  get name () {
    return 'pause'
  }

  get aliases () {
    return ['pp']
  }

  async run (event, args) {
    const guild_id = event.guild_id
    this.client.shard.sendWS(0, 'LPAUSE', {guild_id: guild_id})

    return this.client.rest.channel.createMessage(event.channel_id, 'Pausing the music')
  }
}

module.exports = Pause
