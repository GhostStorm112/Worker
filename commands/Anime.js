const Command = require('../structures/Command')
const kitsu = require('node-kitsu')
class Anime extends Command {
  get name () {
    return 'anime'
  }

  get aliases () {
    return ['an']
  }

  async run (event, args) {
    kitsu.searchAnime(args, 0)
      .then(result => {
        if (result.length === 0) {
          return this.client.rest.channel.createMessage(event.channe_id, `No results found for: **${args}**`)
        }
        
        const anime = result[0]
        const url = `https://kitsu.io/anime/${anime.attributes.slug}`

        return this.client.rest.channel.createMessage(event.channel_id, {
          embed: {
            type: 'rich',
            title: anime.attributes.titles.en_jp,
            url,
            description: `**Synopsis:**\n${anime.attributes.synopsis.substring(0, 450)}...`,
            color: 0xff0000,
            fields: [
              {
                name: '❯ Type',
                value: fixCase(anime.attributes.showType),
                inline: true
              },
              {
                name: '❯ Episodes',
                value: anime.attributes.episodeCount,
                inline: true
              },
              {
                name: '❯ Rating',
                value: anime.attributes.averageRating,
                inline: true
              }
            ],
            author: {
              name: 'kitsu.io',
              url: 'https://kitsu.io'
            },
            thumbnail: { url: anime.attributes.posterImage.small }
          }
        })
      })
      .catch(err => {
        console.error(err)
        return this.client.rest.channel.createMessage(event.channe_id, 'There was an error processing the search.')
      })
  }
}

function fixCase (str) {
  return str.toLowerCase().replace(/(^| )(\w)/g, s => s.toUpperCase())
}

module.exports = Anime
