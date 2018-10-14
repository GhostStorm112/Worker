const Command = require('../../structures/Command')
const RichEmbed = require('../../utils/RichEmbed')
class Test extends Command {
  get name () {
    return 'test'
  }

  get aliases () {
    return ['say']
  }

  async run (event, args) {
    const userVoiceChannel = await this.client.cache.guilds[event.guild_id].voice_states.get(event.author.id)
    this.client.log.debug('Test', userVoiceChannel.id)
    this.client.log.debug('Test', event.nonce)
    const used = process.memoryUsage()
    for(const key in used){
      this.client.log.debug('Test', `${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100}`)
    }

    async function sleep(time) {
      const start = new Date().getTime()
      for (let i = 0; i < 1e7; i++){
        if((new Date().getTime() - start ) > time){
          break
        }
      }
    }
    // if (!this.client.isOwner(event.author.id)) { return }
    // let queue
    // let tracks
    // let playing
    // queue = await this.client.lavalink.queues.get(event.guild_id)
    // tracks = await queue.tracks()
    // playing = await queue.current()
    // console.log(tracks)
    // console.log(playing)
    /* let message = new RichEmbed()
      .setTitle('This is your title, it can hold 256 characters')
      .setAuthor('Author Name', 'https://i.imgur.com/lm8s41J.png')

      .setColor(0x00AE86)
      .setDescription('This is the main body of text, it can hold 2048 characters.')
      .setFooter('This is the footer text, it can hold 2048 characters', 'http://i.imgur.com/w1vhFSR.png')
      .setImage('http://i.imgur.com/yVpymuV.png')
      .setThumbnail('http://i.imgur.com/p2qNFag.png')

      .setTimestamp()
      .setURL('https://discord.js.org/#/docs/main/indev/class/RichEmbed')
      .addField('This is a field title, it can hold 256 characters',
        'This is a field value, it can hold 2048 characters.')

      .addField('Inline Field', 'They can also be inline.', true)

      .addBlankField(true)
      .addField('Inline Field 3', 'You can have a maximum of 25 fields.', true)
    console.log({embed: message})
    this.client.rest.channel.createMessage(event.channel_id, {embed: message}) */
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
