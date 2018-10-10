const Command = require('../../structures/Command')
const Cats = require('cats-js')

class Echo extends Command {
  get name () {
    return 'cat'
  }

  get aliases () {
    return ['cc']
  }

  get usage () {
    return 'cat'
  }

  async run (event, args) {
    this.client.rest.channel.startChannelTyping(event.channel_id)

    const c = new Cats('MzIwMTI5')
    const kitty = await c.get()
    const image = kitty.images.image.url
    if (image) {
      return this.client.rest.channel.createMessage(event.channel_id, {
        embed: {
          author: {
            name: `${event.author.username}#${event.author.discriminator} (${event.author.id})`,
            icon_url: `https://cdn.discordapp.com/avatars/${event.author.id}/${event.author.avatar}.webp`
          },
          description: `**OMG ITS A KITTY!** `,
          image: {
            url: `${image}`
          }

        }
      })
    } else {
      return this.client.rest.channel.createMessage(event.channel_id, args || `No kittys today! :(`)
    }
  }
}

module.exports = Echo
