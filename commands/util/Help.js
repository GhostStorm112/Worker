const Command = require('../../structures/Command')

class Help extends Command {
  get name () {
    return 'help'
  }

  get aliases () {
    return ['help']
  }

  get help () {
    return `Help command sends a PM with help for the bot`
  }

  async run (event, args, map) {
    Object.keys(map).forEach(function (key) {
      var command = map[key]
      console.log(command)
    })
    console.log(Object.keys(map))
    // let author = event.author.id
    // let channel = await this.client.rest.user.createDirectMessageChannel(author)
    // return this.client.rest.channel.createMessage(channel.id, 'hi')
  }
}

module.exports = Help
