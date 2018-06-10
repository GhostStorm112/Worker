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
    let message = []
    message.push(`\`\`\`javascript\n`)
    message.push('==Shards==\n')
    axios.get('http://localhost:7000/shards/status')
      .then(response => {
        for (var shard in response.data.shards) {
          message.push(`Shard-${response.data.shards[shard].id} S: "${response.data.shards[shard].status}" R: "${response.data.shards[shard].seq}"\n`)
        }
        message.push(`\n\`\`\``)
        console.log(message)

        return this.client.rest.channel.createMessage(event.channel_id, `${message}`)
      })
  }
}
module.exports = ShardS
