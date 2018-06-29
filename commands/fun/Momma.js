const Command = require('../../structures/Command')
const axios = require('axios')
class Momma extends Command {
  get name () {
    return 'yomomma'
  }

  get aliases () {
    return ['yomom']
  }

  get help () {
    return `Returns a Yomomma joke`
  }

  async run (event, args) {
    axios.get('http://api.yomomma.info')
      .then(response => {
        return this.client.rest.channel.createMessage(event.channel_id, {
          embed: {
            author: {
              name: `${event.author.username}#${event.author.discriminator} (${event.author.id})`,
              icon_url: `https://cdn.discordapp.com/avatars/${event.author.id}/${event.author.avatar}.webp`
            },
            description: `**${response.data.joke}** `,
            image: {
              url: `https://m.popkey.co/32bdb8/YdWkL.gif`
            }

          }
        })
      })
  }
}

module.exports = Momma
