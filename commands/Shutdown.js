const Command = require('../structures/Command')

class Shutdown extends Command {
  constructor (handler) {
    super(handler)
  }

  get name () {
    return 'shutdown'
  }

  get aliases () {
    return ['sh']
  }

  run (event, args) {
    console.log(`ECHO -> ${args}`)
    this.client.shard.sendWS('SHUTDOWN', '')
    return this.client.rest.channel.createMessage(event.channel_id, 'Bot shutdown started')
  }
}

module.exports = Shutdown
