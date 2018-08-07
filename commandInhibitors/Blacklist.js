const Inhibitor = require('../structures/Inhibitor')

class Blacklist extends Inhibitor {
  get name () {
    return 'blacklist'
  }

  async run (event, commandName) {
    let setting = await this.client.settings.getSetting('blacklist', event.guild_id)
    if (setting != null && setting.data.includes(event.author.id)) {
      return 'You are blacklisted from the bot'
    }
  }
}

module.exports = Blacklist
