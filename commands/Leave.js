const Command = require('../structures/Command')

class Leave extends Command {
  get name () {
    return 'leave'
  }

  get aliases () {
    return ['le']
  }

  async run (event, args) {
    const guild_id = event.guild_id
    let data = {
      t: 'LLEAVE',
      d: { guild_id: guild_id, channel_id: '268807882059939841' }
    }
    this.client.shard.sendWS(0, data.t, data.d)
    return this.client.rest.channel.createMessage(event.channel_id, 'Party later?')
  }
}

module.exports = Leave
