const WeatherMachine = require('./WeatherMachine')
const GhostCore = require('Core')

const wm = new WeatherMachine({ camelCaseEvents: true })
const log = new GhostCore.Logger()
const DBL = require('dblapi.js')
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI3NzAyMDcyNzA0MjExMzUzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTI4NTQyMzEyfQ.sBxl-DI1SxpA9t8yCaPCJ5bkNjyc6AeCCXPv1mfBYNk')

async function run () {
  log.info('STARTUP', 'Starting')
  await wm.initialize()

  log.info('STARTUP', 'Ready')
  wm.on('messageCreate', data => {
    return handleMessage(data)
  })

  wm.on('dblu', async data => {
    log.info('DBL', `Updated Discord Bot List with ${await wm.cache.guild.getIndexCount()}`)
    dbl.postStats(await wm.cache.guild.getIndexCount(), null, null)
  })
}
async function handleMessage (msg) {
  log.info('Message', `${msg.shard_id}:${msg.guild_id}:${msg.guild_id}:${msg.author.username}#${msg.author.discriminator}: ${msg.content}`)
}

run().catch(error => log.error('STARTUP', error))
