const Command = require('../../structures/Command')
const axios = require('axios')
const util = require('util')

class Illegal extends Command {
  get name () {
    return 'isnowillegal'
  }

  get aliases () {
    return ['ini']
  }

  async run (event, args) {
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
module.exports = Illegal
