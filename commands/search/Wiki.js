const Command = require('../../structures/Command')
const wiki = require('wikijs').default
class Wiki extends Command {
  constructor(client){
    super(client, {
      name: 'wiki',
      aliases: 'wikidiki',
      description: 'Searches wikipedia for your specified search',
    })
  }

  async run (event, args) {
    this.client.rest.channel.startChannelTyping(event.channel_id)
    args = args.trim()
    const query = args
    if (!query) {
      return this.client.rest.channel.createMessage(event.channel_id, 'You must specify something to search!')
    }
    const data = await wiki().search(query, 1)
    if (!data.results || !data.results.length) {
      return this.client.rest.channel.createMessage(event.channel_id, 'No results found!')
    }

    const page = await wiki().page(data.results[0])
    const summary = await page.summary()
    const paragraphs = summary.split('\n')
    const url = page.raw.fullurl
    paragraphs.length = Math.min(2, paragraphs.length)
    // Replace with new RichEmbed builder
    return this.client.rest.channel.createMessage(event.channel_id, {
      embed: {
        color: 0xff0000,
        title: page.raw.title,
        url,
        author: {
          name: 'Wikipedia',
          icon_url: 'https://a.safe.moe/8GCNj.png'
        },
        description: paragraphs.join('\n\n')
      }
    })
  }
}

module.exports = Wiki
