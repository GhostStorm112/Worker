const EventHandler = require('../structures/EventHandler')
const idToBinary = require('../utils/idToBinary')
class LavalinkHandler extends EventHandler {
  get name () {
    return 'lavalink'
  }

  get canHandle () {
    return ['LAVALINK_RECOVER']
  }

  async handle (event) {
    let players = await this.client.cache.storage.get('players', { type: 'arr' })
    let queue
    let tracks
    let playing
    if (players) {
      queue = await this.client.lavalink.queues.get(event.guild_id)
      tracks = await queue.tracks()
      playing = await queue.current()

      console.log(queue.player)
      console.log(playing)

      if (tracks.length > 0 || !playing) { console.log('Not playing or queue is empty or a fucking bug') }

      let shardNum
      for (const player of players) {
        shardNum = parseInt(idToBinary(player.guild_id).slice(0, -22), 2) % event.shard_amount

        if (shardNum === event.shard) {
          this.client.log.debug('LavalinkHandler', `Starting queue ${player.guild_id} on shard ${shardNum}`)
          // await this.client.shard.sendWS(shardNum, 'VOICE_STATE_UPDATE', { shard_id: shardNum, guild_id: player.guild_id, channel_id: null, self_mute: false, self_deaf: false })
          await this.client.shard.sendWS(shardNum, 'VOICE_STATE_UPDATE', { shard_id: shardNum, guild_id: player.guild_id, channel_id: player.channel_id, self_mute: false, self_deaf: false })
          await this.client.shard.sendWS(shardNum, 'VOICE_STATE_UPDATE', { shard_id: shardNum, guild_id: player.guild_id, channel_id: player.channel_id, self_mute: false, self_deaf: false })

          await this.client.shard.sendWS(shardNum, 'LAVALINK', { shard_id: shardNum, action: 'RECOVER', guild_id: player.guild_id, channel_id: player.channel_id, self_mute: false, self_deaf: false })
        }
      }
    }
  }
}

module.exports = LavalinkHandler
