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
    // args = args.trim()
    let user = args.replace(/[<>@addremove ]/g, '')
    let action = args.replace(/[<>@ 0-9]/g, '')

    let setting = await this.client.settings.getSetting('blacklist', event.guild_id)

    if (action === 'add') {
      if (!setting) {
        this.client.settings.updateSetting('blacklist', event.guild_id, [user])
        return this.client.rest.channel.createMessage(event.channel_id, `Blacklisted: <@${user}>`)
      } else {
        let users = setting.data
        users.push(user)
        if (Object.values(users).indexOf(user) > -1) { return this.client.rest.channel.createMessage(event.channel_id, `User is already blacklisted!`) }
        this.client.settings.updateSetting('blacklist', event.guild_id, users)
        return this.client.rest.channel.createMessage(event.channel_id, `Blacklisted: <@${user}>`)
      }
    } else if (action === 'remove') {
      let users = setting.data
      console.log(users[toString(users)])
      return this.client.rest.channel.createMessage(event.channel_id, `Removed: <@${user}> from the blacklist`)
    } else {
      return this.client.rest.channel.createMessage(event.channel_id, 'Hmm.. something isn\'t right')
    }
  }
}

module.exports = Blacklist
