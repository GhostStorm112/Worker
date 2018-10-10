const Command = require('../../structures/Command')
const billboard = require('billboard-top-100').getChart

class TopSongs extends Command {
  get name () {
    return 'topsongs'
  }

  get aliases () {
    return ['tops']
  }

  async run (event, args) {
    billboard('hot-100', (err, songs) => {
      let message

      if (err) this.client.log.error(err)
      message = '```js\n' + '==Billboard top 10==\n'
      this.client.log.info('topsongs', songs)
      for (const song of songs) {
        if (song.rank > 10) break
        message = message + `Rank: "${song.rank}" Title: "${song.title}" Artist: "${song.artist}"\n`
      }

      message = message + '```'
      this.client.log.info('topsongs', message)
      return this.client.rest.channel.createMessage(event.channel_id, message)
    })
  }
}

module.exports = TopSongs
