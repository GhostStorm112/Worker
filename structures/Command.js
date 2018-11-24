/**
 * A command that can be executed from messages
 * @abstract
 * @prop {String} name The command's name
 */
class Command {
  constructor (client, info) {
    Object.defineProperty(this, 'client', { value: client.client })
    this.name = info.name
    this.aliases = info.aliases || []
    this.description = info.description
    
    this.guildOnly = Boolean(info.guildOnly)
    this.ownerOnly = Boolean(info.ownerOnly)
    this.nsfw = Boolean(info.nsfw)
    this.userPermissions = info.userPermissions || null
    this.usage = info.usage
  }


  /**
  * Function that executes the command according to the passed arguments
  * @param {Object} event The raw event
  * @param {String} [args] The arguments specified by the user
  * @abstract
  */
  run (event, args, info) { } // eslint-disable-line no-unused-vars
}

module.exports = Command
