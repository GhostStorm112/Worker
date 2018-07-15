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
    const roles = await this.client.rest.guild.getGuildRoles(event.guild_id)
    if (args === 'start') {
      let updatedata = {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false
      }

      await this.client.rest.channel.editChannelPermission(event.channel_id, roles[1].id, updatedata)
      return this.client.rest.channel.createMessage(event.channel_id, 'Lockdown started')
    } else if (type === 'stop') {

    }
  }
}

module.exports = Lockdown
