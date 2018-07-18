const Command = require('../../structures/Command')

class Test extends Command {
  get name () {
    return 'test'
  }

  get aliases () {
    return ['say']
  }

  async run (event, args) {
    if (!this.client.isOwner(event.author.id)) { return }
    let queue
    let tracks
    let playing
    queue = await this.client.lavalink.queues.get(event.guild_id)
    tracks = await queue.tracks()
    playing = await queue.current()
    console.log(tracks)
    console.log(playing)
    /*
    let roles = await this.client.rest.guild.getGuildRoles(event.guild_id)
    let user = await this.client.rest.guild.getGuildMember(event.guild_id, event.author.id)
    let userRoles = user.roles
    for (var role in roles) {
      if (roles[role].name === 'Ghost') {
        for (var urole in userRoles) {
          console.log(userRoles[urole])
          if (userRoles[urole] === roles[role].id) {
            console.log('User has role')
          }
        }
        console.log('Ghost role found')
      }
    }
    args = args.trim()
    const settings = await this.client.settings.getSetting('test', '100')
    this.client.settings.updateSetting('a', '200', 'bob the builder') */
    // console.log(settings)
  }
}

module.exports = Test
