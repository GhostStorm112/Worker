const WeatherMachine = require('./WeatherMachine')
const GhostCore = require('Core')

const wm = new WeatherMachine({ camelCaseEvents: true })
const log = new GhostCore.Logger()

async function run () {
  log.info('STARTUP', 'Starting')
  await wm.initialize()

  log.info('STARTUP', 'Ready')

  wm.on('messageCreate', data => {
    return handleMessage(data)
  })

  wm.on('ready', data => {
    console.log('ready')
  })
}
async function handleMessage (msg) {
  const guild = await wm.cache.channel.get(msg.guild_id)
  const channel = await wm.cache.channel.get(msg.channel_id)

  log.info('Message', `${channel.name}: ${msg.author.username}#${msg.author.discriminator}: ${msg.content}`)
}

run().catch(error => log.error('STARTUP', error))
