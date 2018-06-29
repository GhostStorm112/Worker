const Command = require('../../structures/Command')
const axios = require('axios')
class Chuck extends Command {
  get name () {
    return 'chuck'
  }

  get aliases () {
    return ['chucknorris']
  }

  get help () {
    return `Returns a chuck norrris qutoe`
  }

  async run (event, args) {
    axios.get('http://api.icndb.com/jokes/random')
      .then(response => {
        return this.client.rest.channel.createMessage(event.channel_id, {
          embed: {
            author: {
              name: `${event.author.username}#${event.author.discriminator} (${event.author.id})`,
              icon_url: `https://cdn.discordapp.com/avatars/${event.author.id}/${event.author.avatar}.webp`
            },
            description: `**${response.data.value.joke}** `,
            image: {
              url: `https://thumbs.gfycat.com/MadeupMarvelousAfricancivet-size_restricted.gif`
            }

          }
        })
      })
  }
}

module.exports = Chuck
