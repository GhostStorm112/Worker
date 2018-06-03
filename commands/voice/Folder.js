const Command = require('../../structures/Command')

class Folder extends Command {
  get name () {
    return 'folder'
  }

  get info () {
    return 'test'
  }

  get usage () {

  }
  get aliases () {
    return ['ff']
  }

  async run (event, args) {
    return this.client.rest.channel.createMessage(event.channel_id, 'I am inside a folder!')
  }
}

module.exports = Folder
