const Worker = require('ghost-worker')
const DBL = require('dblapi.js')
const path = require('path')
const info = require('./package.json')
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI3NzAyMDcyNzA0MjExMzUzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTE4NTIzODk4fQ.q0iGYkuVAWiG8ZVVqQ60YSi2KR0jbqZBrqxzFEASipQ')
const client = new Worker({
  camelCaseEvents: true,
  eventPath: path.join(__dirname, './eventHandlers/'),
  redisUrl: process.env.REDIS_URL,
  mongoUrl: process.env.MONGO_URL,
  amqpUrl: process.env.AMQP_URL,
  botId: process.env.BOT_ID,
  lavalinkPassword: process.env.LAVALINK_PASSWORD,
  lavalinkRest: process.env.LAVALINK_REST,
  lavalinkWs: process.env.LAVALINK_WS,
  discordToken: process.env.TOKEN,
  ownerId: process.env.OWNER_ID
})
async function run () {
  client.log.info('Worker', `
   _____ _    _  ____   _____ _______
  / ____| |  | |/ __ \\ / ____|__   __|
 | |  __| |__| | |  | | (___    | |
 | | |_ |  __  | |  | |\\___ \\   | |
 | |__| | |  | | |__| |____) |  | |
  \\_____|_|  |_|\\____/|_____/   |_|
    
    Version: ${info.version} By: ${info.author}
  `)
  client.log.info('Worker', 'Starting')
  await client.initialize()
  client.log.info('Worker', 'Ready')

  client.on('dblu', async () => {
    client.log.info('DBL', `Updated Discord Bot List with ${await client.cache.guild.getIndexCount()}`)
    dbl.postStats(await client.cache.guild.getIndexCount(), null, null)
  })
}

run().catch(error => client.log.error('STARTUP', error))
