const Command = require('../../structures/Command')

class Help extends Command {
  get name () {
    return 'help'
  }

  get aliases () {
    return ['help']
  }

  async run (event, args) {
    let author = event.author.id
    let channel = await this.client.rest.user.createDirectMessageChannel(author)
    return this.client.rest.channel.createMessage(channel.id, 'hi')
  }
}

module.exports = Help
