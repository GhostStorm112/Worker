class Shard {
  constructor (wm) {
    this.wm = wm
  }
  sendWS (t, packet) {
    this.wm.connector.sendToGateway({
      t: 'VOICE_STATE_UPDATE',
      d: packet
    })
  }

  oldws (t, packet) {
    this.wm.connector.sendToGateway({
      t: t,
      d: packet
    })
  }
}
module.exports = Shard
