const Command = require('../../structures/Command')
const paginate = require('../../utils/paginate')
const { stripIndents } = require('common-tags')

class Queue extends Command {
  constructor(client){
    super(client, {
      name: 'queue',
      description: 'Shows the current music queue',
      guildOnly: true,
    })
  }

  async run (event, args) {
    const queue = await this.client.lavalink.queues.get(event.guild_id)
    let tracks = await queue.tracks()
    const playing = await queue.current()
    if (!tracks.length > 0 && !playing) { return this.client.rest.channel.createMessage(event.channel_id, 'The queue is empty :cry:') }
    tracks = [playing.track, ...tracks]

    if ((!playing && !tracks) || (!playing.length && !tracks.length)) {
      return this.client.rest.channel.createMessage(event.channel_id, 'Can\'t show you what I don\'t have.')
    }

    const data = []

    for (const track of tracks) {
      data.push(await this.client.lavalink.decode(track))
    }

    const totalLength = data.reduce((prev, song) => prev + song.length, 0)
    const paginated = paginate(data.slice(1), args)
    let index = 10 * (paginated.page - 1)

    return this.client.rest.channel.createMessage(event.channel_id, {
      embed: {
        color: 0xff0000,
        description: stripIndents`
                **Song queue${paginated.page > 1 ? `, page ${paginated.page}` : ''}**

                ${paginated.items.length ? paginated.items.map(song => `**${++index}.** [${song.title}](${song.uri}) (${this.timeString(song.length)})`).join('\n') : 'No more songs in queue.'}

                **Now playing:** [${data[0].title}](${data[0].uri}) (${this.timeString(data[0].length)})

                **Total queue time:** ${this.timeString(totalLength)}
            `,
        footer: paginated.maxPage > 1 ? { text: 'Use ghost queue <page> to view a specific page.' } : undefined
      }
    })
  }

  timeString (seconds, forceHours = false, ms = true) {
    if (ms) seconds /= 1000
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor(seconds % 3600 / 60)

    return `${forceHours || hours >= 1 ? `${hours}:` : ''}${hours >= 1 ? `0${minutes}`.slice(-2) : minutes}:${`0${Math.floor(seconds % 60)}`.slice(-2)}`
  }
}

module.exports = Queue
