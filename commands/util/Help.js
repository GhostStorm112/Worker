const Command = require('../../structures/Command')

class Help extends Command {
  get name () {
    return 'help'
  }

  get aliases () {
    return ['help']
  }

  async run (event, args) {
    let author = event.author.id
    let channel = await this.client.rest.user.createDirectMessageChannel(author)
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
          value: '``anime``, ``manga``, ``wiki``',
          infline: true
        },
        {
          name: 'Util',
          value: '``echo``, ``help``, ``purge``',
          infline: true
        },
        {
          name: 'Music',
          value: '``clearq``, ``leave``, ``pause``, ``play``, ``queue``, ``resume``, ``skip``, ``stop``',
          infline: true
        }]

      }
    })
  }
}

module.exports = Help
