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
    this.client.log.debug('Cache', `Caching ${event.type}`)
    switch (event.type) {
      case 'CHANNEL_CREATE':
        await this.client.cache.actions.channels.upsert(event)
        break
      case 'CHANNEL_DELETE':
        await this.client.cache.actions.channels.delete(event)
        break
      case 'CHANNEL_PINS_UPDATE':
        await this.client.cache.actions.channels.upsert(event)
        break
      case 'CHANNEL_UPDATE':
        break
      case 'GUILD_BAN_ADD':
        break
      case 'GUILD_BAN_REMOVE':
        break
      case 'GUILD_CREATE':
        await this.client.cache.actions.guilds.upsert(event)
        break
      case 'GUILD_DELETE':
        await this.client.cache.actions.guilds.delete(event)
        break
      case 'GUILD_EMOJIS_UPDATE':
        break
      case 'GUILD_MEMBERS_CHUNK':
        await this.client.cache.actions.members.upsert(event)
        break
      case 'GUILD_MEMBER_ADD':
        await this.client.cache.actions.members.upsert(event)
        break
      case 'GUILD_MEMBER_REMOVE':
        await this.client.cache.actions.members.delete(event)
        break
      case 'GUILD_MEMBER_UPDATE':
        await this.client.cache.actions.members.upsert(event)
        break
      case 'GUILD_ROLE_CREATE':
        await this.client.cache.actions.roles.upsert(event)
        break
      case 'GUILD_ROLE_DELETE':
        await this.client.cache.actions.roles.upsert(event)
        break
      case 'GUILD_ROLE_UPDATE':
        await this.client.cache.actions.roles.upsert(event)
        break
      case 'GUILD_UPDATE':
        await this.client.cache.actions.guilds.upsert(event)
        break
      case 'USER_UPDATE':
        await this.client.cache.actions.users.upsert(event)
        break
      case 'VOICE_STATE_UPDATE':
        await this.client.cache.actions.voiceStates.upsert(event)
        break
      case 'VOICE_SERVER_UPDATE':
        break
    }
  }
}

module.exports = CacheHandler
