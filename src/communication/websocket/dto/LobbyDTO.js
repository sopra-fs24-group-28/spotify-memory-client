class LobbyDTO {
  constructor(data = {}) {
    this.gameParameters = data.GameParameters || {};
    this.playerList = data.playerList || [];
    this.state = data.state || {};
    this.host = data.host || null;
  }
}

export default LobbyDTO;
