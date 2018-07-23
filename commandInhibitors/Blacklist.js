const Inhibitor = require('../structures/Inhibitor')

class Blacklist extends Inhibitor {
  get name () {
    return 'blacklist'
  }

  async run (event, commandName) {
    let setting = await this.client.settings.getSetting('blacklist', event.guild_id)
    if (setting != null && Object.values(setting.data).indexOf(event.author.id) > -1) {
      return 'blacklisted'
    }
  }
}

module.exports = Blacklist
