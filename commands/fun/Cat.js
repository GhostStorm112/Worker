const Command = require('../../structures/Command')
const Cats = require('cats-js')

class Echo extends Command {
  get name () {
    return 'cat'
  }

  get aliases () {
    return ['cc']
  }

  get help () {
    return `Returns a cat image`
  }

  async run (event, args) {
    let kitty
    let image
    const c = new Cats('MzIwMTI5')
    kitty = await c.get()
    image = await kitty.images.image.url
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
