const EventHandler = require('../structures/EventHandler')
class TestHandler extends EventHandler {
  get name () {
    return 'test'
  }

  get canHandle () {
    return ['TEST']
  }

  async handle (event) {
  }
}

module.exports = TestHandler
