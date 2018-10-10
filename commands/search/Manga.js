const Command = require('../../structures/Command')
const kitsu = require('node-kitsu')
const RichEmbed = require('../../utils/RichEmbed')
class Manga extends Command {
  get name () {
    return 'manga'
  }

  get aliases () {
    return ['man']
  }

  async run (event, args) {
    this.client.rest.channel.startChannelTyping(event.channel_id)
    kitsu.searchManga(args, 0)
      .then(result => {
        if (result.length === 0) {
          return this.client.rest.channel.createMessage(event.channe_id, `No results found for: **${args}**`)
        }

        const anime = result[0]
        const url = `https://kitsu.io/manga/${anime.attributes.slug}`

        const message = new RichEmbed()
          .setTitle(anime.attributes.titles.en_jp)
          .setURL(url)
          .setAuthor('kitsu.io', null, 'https://kitsu.io')
          .setThumbnail(anime.attributes.posterImage.small)
          .setDescription(`**Synopsis:**\n${anime.attributes.synopsis.substring(0, 450)}...`)
          .setColor(0xff0000)
          .setTimestamp()
          .addField('❯ Type', fixCase(anime.attributes.mangaType), true)
          .addField('❯ Rank', anime.attributes.popularityRank, true)
          .addField('❯ Volumes', anime.attributes.volumeCount || '-', true)
          .addField('❯ Chapters', anime.attributes.chapterCount || '-', true)
        return this.client.rest.channel.createMessage(event.channel_id, {embed: message})
      })
      .catch(err => {
        this.client.log.error(err)
        return this.client.rest.channel.createMessage(event.channe_id, 'There was an error processing the search.')
      })
  }
}

function fixCase (str) {
  return str.toLowerCase().replace(/(^| )(\w)/g, s => s.toUpperCase())
}

module.exports = Manga
