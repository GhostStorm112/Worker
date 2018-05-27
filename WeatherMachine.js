require('bluebird')
require('dotenv').config()

const EventEmitter = require('eventemitter3')
const SnowTransfer = require('snowtransfer')
const RainCache = require('raincache')
const AmqpConnector = require('./AqmpConnector')
const promisifyAll = require('tsubaki').promisifyAll
const fs = promisifyAll(require('fs'))
const path = require('path')

// const { camelCaseEventName } = new GhostCore.Utils.camelCaseEventName()

class WeatherMachine extends EventEmitter {
  constructor (options = { }) {
    super()

    if (options.disabledEvents) { options.disabledEvents = new Set(options.disabledEvents) }

    this.options = Object.assign({
      disabledEvents: null,
      camelCaseEvents: false,
      eventPath: path.join(__dirname, './eventHandlers/')
    }, options)

    this.cache = new RainCache({
      storage: { default: new RainCache.Engines.RedisStorageEngine({ password: process.env.REDIS_PASS }) },
      debug: false
    })
    this.rest = new SnowTransfer(process.env.TOKEN)
    this.connector = new AmqpConnector(this)

    this.eventHandlers = new Map()
  }

  async initialize () {
    await this.cache.initialize()
    await this.connector.initialize()
    await this.loadEventHandlers()

    this.connector.on('event', event => this.processEvent(event))
  }

  async loadEventHandlers () {
    const files = await fs.readdirAsync(this.options.eventPath)

    for (const file of files) {
      if (!file.endsWith('.js') || file.includes(' ')) { continue }

      const handler = new (require(this.options.eventPath + file))(this)
      this.eventHandlers.set(handler.name, handler)

      if (typeof handler.init === 'function') { await handler.init() }

      for (const event of handler.canHandle) { this.on(event, handler.handle.bind(handler)) }
    }
  }

  processEvent (event) {
    // console.log(event)
    if (this.options.disabledEvents && this.options.disabledEvents.has(event.t)) { return null }

    return this.emit(event.t, event.d)
  }
}

module.exports = WeatherMachine
