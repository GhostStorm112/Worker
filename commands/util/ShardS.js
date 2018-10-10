const Command = require('../../structures/Command')

class ShardS extends Command {
  get name () {
    return 'shards'
  }

  get aliases () {
    return ['shardss']
  }

  async run (event, args) {
    if (!this.client.isOwner(event.author.id)) { return }
    const shards = await this.client.cache.storage.get('shards', {type: 'arr'})

    let message
    message = '```js\n' + '==Shards==\n'

    for (const shard of shards) {
      if (parseInt(shard.shard_id) === event.shard_id) {
        message = message + `*Shard-${shard.shard_id} S: "${shard.shard_status}" R: "${shard.shard_event}"\n`
      } else {
        message = message + `Shard-${shard.shard_id} S: "${shard.shard_status}" R: "${shard.shard_event}"\n`
      }
    }
    message = message + '```'
    this.client.log.info('shards',message)
    return this.client.rest.channel.createMessage(event.channel_id, message)
  }
}
module.exports = ShardS
