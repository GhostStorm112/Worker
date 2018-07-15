const EventHandler = require('../structures/EventHandler')

class CacheHandler extends EventHandler {
  get name () {
    return 'cache'
  }

  get canHandle () {
    return ['CHANNEL_CREATE', 'CHANNEL_DELETE', 'CHANNEL_PINS_UPDATE', 'CHANNEL_UPDATE', 'GUILD_BAN_ADD',
      'GUILD_BAN_REMOVE', 'GUILD_CREATE', 'GUILD_DELETE', 'GUILD_EMOJIS_UPDATE', 'GUILD_MEMBERS_CHUNK',
      'GUILD_MEMBER_ADD', 'GUILD_MEMBER_REMOVE', 'GUILD_MEMBER_UPDATE', 'GUILD_ROLE_CREATE', 'GUILD_ROLE_DELETE',
      'GUILD_ROLE_UPDATE', 'GUILD_UPDATE', 'USER_UPDATE', 'VOICE_STATE_UPDATE', 'VOICE_SERVER_UPDATE']
  }

  async handle (event) {
    switch (event) {
      case 'CHANNEL_CREATE':
        break
      case 'CHANNEL_DELETE':
        break
      case 'CHANNEL_PINS_UPDATE':
        break
      case 'CHANNEL_UPDATE':
        break
      case 'GUILD_BAN_ADD':
        break
      case 'GUILD_BAN_REMOVE':
        break
      case 'GUILD_CREATE':
        break
      case 'GUILD_DELETE':
        break
      case 'GUILD_EMOJIS_UPDATE':
        break
      case 'GUILD_MEMBERS_CHUNK':
        break
      case 'GUILD_MEMBER_ADD':
        break
      case 'GUILD_MEMBER_REMOVE':
        break
      case 'GUILD_MEMBER_UPDATE':
        break
      case 'GUILD_ROLE_CREATE':
        break
      case 'GUILD_ROLE_DELETE':
        break
      case 'GUILD_ROLE_UPDATE':
        break
      case 'GUILD_UPDATE':
        break
      case 'USER_UPDATE':
        break
      case 'VOICE_STATE_UPDATE':
        break
      case 'VOICE_SERVER_UPDATE':
        break
    }
    // console.log(`PRESENCE -> @${event.user.id} [${event.status}]${event.game ? ` { name: ${event.game.name}, type: ${event.game.type} }` : ''}`)
  }
}

module.exports = CacheHandler
