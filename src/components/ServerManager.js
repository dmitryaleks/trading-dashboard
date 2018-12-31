class ServerManager {

  //serverHostname = 'http://localhost:8080'
  serverHostname = 'http://simulator.dmitryaleks.com:8080/api'

  getServerHostname() {
      return this.serverHostname;
  }
}

export default ServerManager;
