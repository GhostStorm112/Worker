const Command = require('../../structures/Command')

class Lockdown extends Command {
  get name () {
    return 'lockdown'
  }

  get aliases () {
    return ['ld']
  }

  async run (event, args) {
    args = args.trim()
    const { type } = args

    if (args === 'start') {
      let updatedata = {
        permission_overwrites: {
          SEND_MESSAGE: false
        }
      }

      await this.client.rest.channel.updateChannel(event.channel_id, updatedata)
      return this.client.rest.channel.createMessage(event.channel_id, 'Lockdown started')
    } else if (type === 'stop') {

    }
  }
}

module.exports = Lockdown
