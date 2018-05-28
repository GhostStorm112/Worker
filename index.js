const WeatherMachine = require('./WeatherMachine')
const ManyMelodies = require('manymelodies')
const Shard = require('./shard')
const GhostCore = require('Core')
const ytdl = require('ytdl-core')
const wm = new WeatherMachine({ camelCaseEvents: true })
const vcm = new ManyMelodies.VoiceConnectionManager()
const vc = new ManyMelodies.VoiceConnection()
const shard = new Shard(wm)
const log = new GhostCore.Logger()

var userId
var sessionId
var guildId
var channelId
var connection

async function run () {
  log.info('STARTUP', 'Starting')
  await wm.initialize()
  log.info('STARTUP', 'Ready')

  wm.on('messageCreate', data => {
    return handleMessage(data)
  })
  wm.on('voiceServerUpdate', data => {
    vcm.voiceServerUpdate({
      shard: shard,
      guild_id: guildId,
      channel_id: channelId,
      endpoint: data.endpoint,
      token: data.token,
      session_id: sessionId,
      user_id: userId
    })
    log.info('vsu', guildId)
    log.info('vsu', shard)
    log.info('vsu', channelId)
    log.info('vsu', data.endpoint)
    log.info('vsu', data.token)
    log.info('vsu', sessionId)
    log.info('vsu', userId)
  })
  wm.on('voiceStateUpdate', data => {
    userId = data.user_id
    sessionId = data.session_id
    guildId = data.guild_id
    channelId = data.channel_id
  })
}

async function handleMessage (msg) {
  const channel = await wm.cache.channel.get(msg.channel_id)
  log.info('Message', `${channel.name}: ${msg.author.username}#${msg.author.discriminator}: ${msg.content}`)
  if (msg.content.startsWith('test')) {
    let data = {
      t: 'VOICE_STATE_UPDATE',
      d: { guild_id: '268807882059939840', channel_id: '268807882059939841', self_mute: false, self_deaf: false }
    }
    shard.sendWS(data.t, data.d)
    connection = await vcm.join('268807882059939840', '268807882059939841')
    connection.on('ready', message => {
      log.info('Voice', message)
    })
    connection.on('error', message => {
      log.info('Voice', message)
    })
  }
  if (msg.content.startsWith('play')) {
    connection.play(ytdl('https://www.youtube.com/watch?v=9Zj0JOHJR-s'))
  }
}

run().catch(error => log.error('STARTUP', error))
