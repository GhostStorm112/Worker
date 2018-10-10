const Command = require('../../structures/Command')
const ud = require('urban-dictionary')
const RichEmbed = require('../../utils/RichEmbed')

class Urban extends Command {
  get name () {
    return 'urban'
  }

  get aliases () {
    return ['urbandiki']
  }

  async run (event, args) {
    this.client.rest.channel.startChannelTyping(event.channel_id)
    args = args.trim()
    const query = args
    if (!query) {
      return this.client.rest.channel.createMessage(event.channel_id, 'You must specify something to search!')
    }
    ud.term(query, (error, entries, tags, sounds) => {
      if (error) {
        this.client.log.error(error)
        return this.client.rest.channel.createMessage(event.channel_id, 'Hmm someting didn\'t go so right')
      } else {
        const message = new RichEmbed()
          .setTitle(`Result for "${query}" `)
          .setColor(0xff0000)
          .setTimestamp()
          .addField('Definition', `${entries[0].definition}`)
          .addField('Example', `${entries[0].example}`)
        this.client.rest.channel.createMessage(event.channel_id, {embed: message})
      }
    })
  }
}

module.exports = Urban
