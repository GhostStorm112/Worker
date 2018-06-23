const Command = require('../../structures/Command')
const axios = require('axios')

class Butt extends Command {
  get name () {
    return 'butts'
  }

  get aliases () {
    return ['ass']
  }

  async run (event, args) {
    const channel = await this.client.rest.channel.getChannel(event.channel_id)
    if (channel.nsfw) {
      axios.get(`http://api.obutts.ru/butts/${randomInt(5000)}/1/rank`)
        .then(response => {
          let image = `http://media.obutts.ru/${response.data[0].preview}`
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

module.exports = Butt
