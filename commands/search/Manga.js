const Command = require('../../structures/Command')
const kitsu = require('node-kitsu')
class Manga extends Command {
  get name () {
    return 'manga'
  }

  get aliases () {
    return ['man']
  }

  get help () {
    return `Returns info on a manga ==manga <manga>`
  }

  async run (event, args) {
    kitsu.searchManga(args, 0)
      .then(result => {
        if (result.length === 0) {
          return this.client.rest.channel.createMessage(event.channe_id, `No results found for: **${args}**`)
        }

        const anime = result[0]
        const url = `https://kitsu.io/manga/${anime.attributes.slug}`

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
                value: fixCase(anime.attributes.mangaType),
                inline: true
              },
              {
                name: '❯ Rank',
                value: anime.attributes.popularityRank,
                inline: true
              },
              {
                name: '❯ Volumes',
                value: anime.attributes.volumeCount || '-',
                inline: true
              },
              {
                name: '❯ Chapters',
                value: anime.attributes.chapterCount || '-',
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

module.exports = Manga
