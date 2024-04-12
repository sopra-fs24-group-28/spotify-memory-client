class Lobby {
  constructor(data = {}) {
    this.GameParameters = data.GameParameters || {};
    this.users = data.users || [];
    this.state = data.state || {};
    this.host = data.host || null;
  }
}

export default Lobby;
