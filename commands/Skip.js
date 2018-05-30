const Command = require('../structures/Command')

class Skip extends Command {
  get name () {
    return 'skip'
  }

  get aliases () {
    return ['sk']
  }

  async run (event, args) {
    const guild_id = event.guild_id
    this.client.shard.sendWS(0, 'LSKIP', {guild_id: guild_id})

    return this.client.rest.channel.createMessage(event.channel_id, 'Skipping song')
  }
}

module.exports = Skip