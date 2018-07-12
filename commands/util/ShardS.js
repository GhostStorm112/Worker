const Command = require('../../structures/Command')
const axios = require('axios')

class ShardS extends Command {
  get name () {
    return 'shards'
  }

  get aliases () {
    return ['shardss']
  }

  async run (event, args) {
    if (!this.client.isOwner(event.author.id)) { return }
    let message = []
    message.push('```js\n')
    message.push('==Shards==\n')
    axios.get(`http://${process.env.GW_HOST}:${process.env.GW_PORT}/shards/status`)
      .then(response => {
        for (var shard in response.data.shards) {
          console.log(response.data.shards[shard].status)
          message.push(`Shard-${response.data.shards[shard].id} S: "${response.data.shards[shard].status}" R: "${response.data.shards[shard].seq}"\n`)
        }
        message.push('```')
        console.log(message)

        return this.client.rest.channel.createMessage(event.channel_id, message.toString())
      })
  }
}
module.exports = ShardS
