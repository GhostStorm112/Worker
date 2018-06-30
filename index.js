const WeatherMachine = require('./WeatherMachine')
const wm = new WeatherMachine({ camelCaseEvents: true })
const DBL = require('dblapi.js')
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI3NzAyMDcyNzA0MjExMzUzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTE4NTIzODk4fQ.q0iGYkuVAWiG8ZVVqQ60YSi2KR0jbqZBrqxzFEASipQ')

async function run () {
  wm.log.info('Worker', `
   _____ _    _  ____   _____ _______
  / ____| |  | |/ __ \\ / ____|__   __|
 | |  __| |__| | |  | | (___    | |
 | | |_ |  __  | |  | |\\___ \\   | |
 | |__| | |  | | |__| |____) |  | |
  \\_____|_|  |_|\\____/|_____/   |_|
    
    Version: ${wm.info.version} By: ${wm.info.author}
  `)
  wm.log.info('Worker', 'Starting')
  await wm.initialize()
  wm.log.info('Worker', 'Ready')
  /*   wm.on('messageCreate', data => {
    return handleMessage(data)
  }) */

  wm.on('dblu', async () => {
    wm.log.info('DBL', `Updated Discord Bot List with ${await wm.cache.guild.getIndexCount()}`)
    dbl.postStats(await wm.cache.guild.getIndexCount(), null, null)
  })
}
/* async function handleMessage (msg) {
   wm.log.info('Message', `${msg.shard_id}:${msg.guild_id}:${msg.guild_id}:${msg.author.username}#${msg.author.discriminator}: ${msg.content}`)
} */

run().catch(error => wm.log.error('STARTUP', error))
