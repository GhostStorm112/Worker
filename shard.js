class Shard {
  constructor (wm) {
    this.wm = wm
  }
  sendWS (shardID, op, packet) {
    this.wm.connector.sendToGateway({
      t: op,
      d: packet
    })
  }
  async getShard (msg) {
    return 0
  }

  async getChannel (msg) {
    return this.wm.cache.channel.get(msg.channel_id)
  }

  async getGuild (msg) {
    return this.wm.cache.channel.get(msg.guild_id)
  }

  oldws (t, packet) {
    this.wm.connector.sendToGateway({
      t: t,
      d: packet
    })
  }
}
module.exports = Shard
