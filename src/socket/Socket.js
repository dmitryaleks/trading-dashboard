const Config = {
  PROTOCOL: "ws:",
  //HOST: "//localhost",
  HOST: "//simulator.dmitryaleks.com",
  PORT: ":7888"
}

class Socket {

  socket
  opened = false
  callbacks = {}
  subjectsPendingSubscription = []

  constructor() {
    const address = Config.PROTOCOL + Config.HOST + Config.PORT
    this.socket = new WebSocket(address)
    console.log("Creating a WebSocket connecting to: " + address)

    this.socket.onopen = () => {
      this.opened = true
      console.log("Socket has been opened")
      // subscribing to all pending subjects
      this.subjectsPendingSubscription.forEach(subject => this.startSubscription(subject))
    }

    this.socket.onmessage = (msg) => {
      console.log("Incoming message on socket: " + msg.data)
      let subject = msg.data.substring(msg.data.indexOf(":") + 1)
      // trigger corresponding callback
      this.callbacks[subject]()
    }
  }

  startSubscription(subscriptionSubject) {
      const msg = JSON.stringify({type:"SUBSCRIBE", subject:subscriptionSubject})
      this.socket.send(msg)
  }

  subscribeForPushNotifications(subscriptionSubject, callback) {

    if (this.opened) {
      this.startSubscription(subscriptionSubject)
    } else {
      this.subjectsPendingSubscription.push(subscriptionSubject)
    }

    this.callbacks[subscriptionSubject] = callback
  }

}

export default Socket;
