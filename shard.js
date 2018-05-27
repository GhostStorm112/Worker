class Shard {
  constructor (wm) {
    this.wm = wm
  }

  sendWS (t, packet) {
    this.wm.connector.sendToGateway({
      t: t,
      d: packet
    })
  }
}
module.exports = Shard
