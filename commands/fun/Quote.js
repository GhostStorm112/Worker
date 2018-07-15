const Command = require('../../structures/Command')
const axios = require('axios')

class Quote extends Command {
  get name () {
    return 'quote'
  }

  get aliases () {
    return ['quote']
  }

  async run (event, args) {
    this.client.rest.channel.startChannelTyping(event.channel_id)

    args = args.trim()

    var config = {
      headers: {'X-Mashape-Key': 'cMnKOn67xumshMUjjhr6hVGLDotkp1rh76QjsnXkCb54oaczPS'}
    }

    axios.get('https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1', config).then(response => {
      return this.client.rest.channel.createMessage(event.channel_id, {
        embed: {
          description: `**${response.data['0'].quote}  \n- ${response.data['0'].author}** `

        }
      })
    })
  }
}
module.exports = Quote
