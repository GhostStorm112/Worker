const Command = require('../../structures/Command')
const billboard = require('billboard-top-100').getChart

class TopSongs extends Command {
  constructor(client){
    super(client, {
      name: 'topsongs',
      aliases: 'ts',
      description: 'Gets a lits of topsongs from billboard top 10',
    })
  }

  async run (event, args) {
    const songs = await this.client.cache.storage.get('topsongs', {type: 'arr'})
    if (songs) {
      this.client.log.info('TOPS', 'Getting cached songs')

      let message
      message = '```js\n' + '==Billboard top 10==\n'

      for( const song of songs){
        if(song.rank){
          message = message + `Rank: "${song.rank}" Title: "${song.title}" Artist: "${song.artist}"\n`
        }
      }
      message = message + '```'

      return this.client.rest.channel.createMessage(event.channel_id, message)
    }
    billboard('hot-100', (err, songs) => {
      this.client.log.info('TOPS', 'Getting new songs')
      let message
      const rsongs = []
      if (err) this.client.log.error(err)
      message = '```js\n' + '==Billboard top 10==\n'
      for (const song of songs) {
        if (song.rank > 10) break
        // rsongs.push(`Rank: "${song.rank}" Title: "${song.title}" Artist: "${song.artist}"\n`)
        rsongs[song.rank] = { rank: song.rank, title: song.title, artist: song.artist }
        message = message + `Rank: "${song.rank}" Title: "${song.title}" Artist: "${song.artist}"\n`
      }
      message = message + '```'
      this.client.cache.storage.set('topsongs', rsongs)
      return this.client.rest.channel.createMessage(event.channel_id, message)
    })
  }
}

module.exports = TopSongs
