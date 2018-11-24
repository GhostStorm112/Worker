const Command = require('../../structures/Command')
const axios = require('axios')
class Chuck extends Command {
  constructor(client){
    super(client, {
      name: 'chuck',
      aliases: 'chucknorris',
      description: 'Sends a Chuck Norris quote',
    })
  }

  async run (event, args) {
    this.client.rest.channel.startChannelTyping(event.channel_id)

    axios.get('http://api.icndb.com/jokes/random')
      .then(response => {
        return this.client.rest.channel.createMessage(event.channel_id, {
          embed: {
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
