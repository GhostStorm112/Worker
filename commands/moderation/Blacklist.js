const Command = require('../../structures/Command')

class Blacklist extends Command {
  get name () {
    return 'blacklist'
  }

  get aliases () {
    return ['bl']
  }

  async run (event, args) {
    if (!this.client.isOwner(event.author.id)) { return }
    const user = args.replace(/[<>@addremove ]/g, '')
    const action = args.replace(/[<>@ 0-9]/g, '')

    const setting = await this.client.settings.getSetting('blacklist', event.guild_id)

    if (action === 'add') {
      if (!setting) {
        this.client.settings.updateSetting('blacklist', event.guild_id, [user])
        return this.client.rest.channel.createMessage(event.channel_id, `Blacklisted: <@${user}>`)
      } else {
        const users = setting.data
        if (setting.data.includes(user)) { return this.client.rest.channel.createMessage(event.channel_id, `User is already blacklisted!`) }
        users.push(user)
        this.client.settings.updateSetting('blacklist', event.guild_id, users)
        return this.client.rest.channel.createMessage(event.channel_id, `Blacklisted: <@${user}>`)
      }
    } else if (action === 'remove') {
      const users = setting.data
      if (setting.data.includes(user)) {
        users.splice(setting.data.indexOf(event.author.id), 1)
        this.client.settings.updateSetting('blacklist', event.guild_id, users)
      }
      return this.client.rest.channel.createMessage(event.channel_id, `Removed: <@${user}> from the blacklist`)
    } else {
      return this.client.rest.channel.createMessage(event.channel_id, 'Hmm.. something isn\'t right')
    }
  }
}

module.exports = Blacklist
