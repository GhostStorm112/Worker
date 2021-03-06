const Command = require('../../structures/Command')

class Lockdown extends Command {
  constructor(client){
    super(client, {
      name: 'lockdown',
      aliases: 'ld',
      description: 'Lockdowns a channel so ownly specific roles can talk',
    })
  }

  async run (event, args) {
    args = args.trim()
    const { type } = args
    const roles = await this.client.rest.guild.getGuildRoles(event.guild_id)
    if (args === 'start') {
      const updatedata = {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false
      }

      this.client.rest.channel.editChannelPermission(event.channel_id, roles[1].id, updatedata)
      return this.client.rest.channel.createMessage(event.channel_id, 'Lockdown started')
    } else if (type === 'stop') {
      const test = "test"
    }
  }
}

module.exports = Lockdown
