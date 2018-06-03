const Command = require('../structures/Command')

class Help extends Command {
  get name () {
    return 'help'
  }

  get aliases () {
    return ['help']
  }

  async run (event, args) {

  }
}

module.exports = Help
