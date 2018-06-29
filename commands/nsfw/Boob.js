const Command = require('../../structures/Command')
const axios = require('axios')

class Boob extends Command {
  get name () {
    return 'boobs'
  }

  get aliases () {
    return ['boobies', 'tit']
  }

  get help () {
    return `Returns a boob image`
  }

  async run (event, args) {
    const channel = await this.client.rest.channel.getChannel(event.channel_id)
    if (channel.nsfw) {
      axios.get(`http://api.oboobs.ru/boobs/${randomInt(5000)}/1/rank`)
        .then(response => {
          let image = `http://media.oboobs.ru/${response.data[0].preview}`
          return this.client.rest.channel.createMessage(event.channel_id, args || {
            embed: {
              author: {
                name: `${event.author.username}#${event.author.discriminator} (${event.author.id})`,
                icon_url: `https://cdn.discordapp.com/avatars/${event.author.id}/${event.author.avatar}.webp`
              },
              description: `**OO YAA** `,
              image: {
                url: image
              }

            }
          })
        })
    } else {
      return this.client.rest.channel.createMessage(channel.id, 'This is not a NSFW channel!')
    }

    function randomInt (high) {
      return Math.floor(Math.random() * high)
    }
  }
}

module.exports = Boob
