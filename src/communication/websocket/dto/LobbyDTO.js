class Lobby {
  constructor(data = {}) {
    this.GameParameters = data.GameParameters || {};
    this.playerList = data.playerList || [];
    this.state = data.state || {};
    this.host = data.host || null;
  }
}

export default Lobby;
