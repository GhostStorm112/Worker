const Command = require('../../structures/Command')
const axios = require('axios')

class ShardS extends Command {
  get name () {
    return 'shards'
  }

  get aliases () {
    return ['shardss']
  }

  get help () {
    return `Returns shard info`
  }

  async run (event, args) {
    if (!this.client.isOwner(event.author.id)) { return }
    let message = []
    message.push(`\`\`\`javascript\n`)
    message.push('==Shards==\n')
    axios.get(`http://${process.env.GW_HOST}:${process.env.GW_PORT}/shards/status`)
      .then(response => {
        for (var shard in response.data.shards) {
          message.push(`Shard-${response.data.shards[shard].id} S: "${response.data.shards[shard].status}" R: "${response.data.shards[shard].seq}"\n`)
        }
        message.push(`\n\`\`\``)
        console.log(message)
        return this.client.rest.channel.createMessage(event.channel_id, message.toString())
      })
  }
}
module.exports = ShardS
