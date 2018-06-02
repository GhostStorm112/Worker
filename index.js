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

  wm.on('voiceStateUpdate', data => {
    console.log(data)
    // wm.shard.sendWS(data.shard_id, 'VOICE_STATE_UPDATE', { guild_id: data.guild_id, channel_id: '268807882059939841', self_mute: false, self_deaf: false })
  })
}
async function handleMessage (msg) {
  log.info('Message', `${msg.shard_id}:${msg.guild_id}:${msg.guild_id}:${msg.author.username}#${msg.author.discriminator}: ${msg.content}`)
}

run().catch(error => log.error('STARTUP', error))
