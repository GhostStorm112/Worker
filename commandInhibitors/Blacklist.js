const Inhibitor = require('../structures/Inhibitor')

class Blacklist extends Inhibitor {
  get name () {
    return 'blacklist'
  }
  async run (event, commandName) {
    
    if(await this.client.cache.storage.get(`blacklist-${event.guild_id}`, {type: 'arr'})){
      this.client.cache.storage.set(`blacklist-${event.guild_id}`, event.author.id)
      console.log('Getting cached')
      return 'You are blacklisted from the bot'
    } else {
      const setting = await this.client.settings.getSetting('blacklist', event.guild_id)
      if (setting != null && setting.data.includes(event.author.id)) {
        return 'You are blacklisted from the bot'
      }
    }
  }
}

module.exports = Blacklist
