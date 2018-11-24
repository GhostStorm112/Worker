const Command = require('../../structures/Command')
const axios = require('axios')
class Momma extends Command {
  constructor(client){
    super(client, {
      name: 'yomomma',
      aliases: 'momma',
      description: 'Sends a yomomma joke',
    })
  }

  async run (event, args) {
    this.client.rest.channel.startChannelTyping(event.channel_id)

    axios.get('http://api.yomomma.info')
      .then(response => {
        return this.client.rest.channel.createMessage(event.channel_id, {
          embed: {
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
