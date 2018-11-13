const Command = require('../../structures/Command')

class Help extends Command {
  get name () {
    return 'help'
  }

  get aliases () {
    return ['help']
  }

  async run (event, args) {
    if (!args) {
      const author = event.author.id
      const channel = await this.client.rest.user.createDirectMessageChannel(author)
      return this.client.rest.channel.createMessage(channel.id, {
        embed: {
          type: 'rich',
          color: 0xff0000,
          author: {
            name: 'Help',
            icon_url: 'https://a.safe.moe/8GCNj.png'
          },
          title: '***Help***',
          fields: [{
            name: 'Running commands',
            value: 'To run a command use: \n``==<command>`` or ``@plug#4059 command``',
            inline: true

          },
          {
            name: 'Help with command',
            value: 'To get help with a command use: \n``==help <command>`` or ``@plug#4059 <command>``',
            inline: true
          },
          {
            name: 'Fun',
            value: '``cat``, ``chuck``, ``momma``, ``quote``,',
            infline: true
          },
          {
            name: 'Moderation',
            value: '``lockdown``',
            infline: true
          },
          {
            name: 'NSFW',
            value: '``boob``, ``butt``',
            infline: true
          },
          {
            name: 'Search',
            value: '``anime``, ``manga``, ``wiki``, ``urban``',
            infline: true
          },
          {
            name: 'Util',
            value: '``echo``, ``help``, ``purge``',
            infline: true
          },
          {
            name: 'Music',
            value: '``clearq``, ``leave``, ``pause``, ``play``, ``queue``, ``resume``, ``skip``',
            infline: true
          }]
        }
      })
    }
    if (args) {
      if (this.client.commandHandler.commands.get(args)) {
        return this.client.rest.channel.createMessage(event.channel_id, `Usage: \`\`${this.client.commandHandler.commands.get(args).usage}\`\``)
      } else {
        return this.client.rest.channel.createMessage(event.channel_id, 'Unknown command')
      }
    }
  }
}

module.exports = Help
