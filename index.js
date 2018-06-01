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
}
async function handleMessage (msg) {
  log.info('Message', `${msg.shard_id}:${msg.guild_id}:${msg.guild_id}:${msg.author.username}#${msg.author.discriminator}: ${msg.content}`)
}

run().catch(error => log.error('STARTUP', error))
