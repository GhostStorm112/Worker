const Inhibitor = require('../structures/Inhibitor')

class Test extends Inhibitor {
  get name () {
    return 'test'
  }

  async run (event, msg, command) {
  }
}

module.exports = Test
