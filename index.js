const WeatherMachine = require('./WeatherMachine')
const GhostCore = require('Core')
const SandySounds = require('sandysounds')
const Shard = require('./shard')
const superagent = require('superagent')

const wm = new WeatherMachine({ camelCaseEvents: true })
const log = new GhostCore.Logger()
const shard = new Shard(wm)

var node = [{
  host: 'localhost',
  port: 9090,
  restPort: 2333,
  userId: '326603853736837121',
  password: '12345',
  numShards: 1
}]

const voice = new SandySounds.Versions.V2(new SandySounds.Clients.Default(shard), node, {failoverRate: 1, failoverLimit: 1})
var connection
var userId
var sessionId
var guildId
var channelId

async function run () {
  log.info('STARTUP', 'Starting')
  await wm.initialize()
  log.info('STARTUP', 'Ready')

  wm.on('messageCreate', data => {
    return handleMessage(data)
  })
  wm.on('voiceServerUpdate', data => {
    voice.voiceServerUpdate({
      token: data.token,
      endpoint: data.endpoint,
      userId: userId,
      guild_id: guildId,
      session_id: sessionId,
      channel_id: channelId,
      shardId: 1
    })
  })
  wm.on('voiceStateUpdate', data => {
    userId = data.user_id
    sessionId = data.session_id
    guildId = data.guild_id
    channelId = data.channel_id
  })
}

async function resolveTracks (node, search) {
  try {
    var result = await superagent.get(`http://localhost:2333/loadtracks?identifier=https://www.youtube.com/watch?v=9Zj0JOHJR-s`)
      .set('Authorization', '12345')
      .set('Accept', 'application/json')
  } catch (err) {
    throw err
  }
  if (!result) {
    console.log('No result!')
  }

  return result.body // array of tracks resolved from lavalink
}
async function handleMessage (msg) {
  const channel = await wm.cache.channel.get(msg.channel_id)
  log.info('Message', `${channel.name}: ${msg.author.username}#${msg.author.discriminator}: ${msg.content}`)

  if (msg.content.startsWith('join')) {
    let data = {
      t: 'VOICE_STATE_UPDATE',
      d: { guild_id: '268807882059939840', channel_id: '268807882059939841', self_mute: false, self_deaf: false }
    }
    shard.sendWS(0, data.t, data.d)
    connection = await voice.join('268807882059939840', '268807882059939841')
  }
  if (msg.content.startsWith('play')) {
    resolveTracks(node, 'My ordinary life').then(tracks => {
      if (!tracks) {

      }
      connection.play(tracks[0].track)
      console.log(tracks)
    })
  }
}

run().catch(error => log.error('STARTUP', error))
