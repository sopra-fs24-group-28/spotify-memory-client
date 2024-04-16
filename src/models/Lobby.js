import GameParameter from "./GameParameter";
import User from "./User";

class Lobby {
  constructor(lobbyId, lobbyDTO) {
    this.lobbyId = lobbyId;
    this.gameParameters = new GameParameter(lobbyDTO?.gameParameters);
    this.playerList = lobbyDTO?.playerList?.map(userData => userData ? new User(userData) : null) || [];
    this.gameState = lobbyDTO?.gameState;
    this.hostId = lobbyDTO?.hostId;
  }

  setGameParameters(gameParameters) {
    this.gameParameters = new GameParameter(gameParameters);
  }

  setUserList(playerList) {
    this.playerList = playerList.map(userData => new User(userData));
  }

  setGameState(gameState) {
    this.gameState = gameState;
  }

  setHostId(hostId) {
    this.hostId = hostId;
  }
}

export default Lobby;
