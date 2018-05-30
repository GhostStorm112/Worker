const Command = require('../structures/Command')

class Play extends Command {
  get name () {
    return 'play'
  }

  get aliases () {
    return ['test']
  }

  async run (event, args) {
    const guild_id = event.guild_id
    args = args.trim()
    console.log(args)
    
    console.log('join')
    let data = {
      t: 'VOICE_STATE_UPDATE',
      d: { guild_id: guild_id, channel_id: '268807882059939841', self_mute: false, self_deaf: false }
    }
    this.client.shard.sendWS(0, data.t, data.d)

    this.client.shard.sendWS(0, 'LPLAY', {guild_id: guild_id, song: args})

    return this.client.rest.channel.createMessage(event.channel_id, args || 'playing')
  }
}

module.exports = Play
