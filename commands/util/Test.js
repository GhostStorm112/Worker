const Command = require('../../structures/Command')

class Test extends Command {
  get name () {
    return 'test'
  }

  get aliases () {
    return ['say']
  }

  async run (event, args) {
    args = args.trim()
    const settings = await this.client.settings.getSetting('test', '100')
    this.client.settings.updateSetting('a', '200', 'bob the builder')
    console.log(settings)
  }
}

module.exports = Test
