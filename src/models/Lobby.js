import GameParameter from "./GameParameter";
import User from "./User";

class Lobby {
  constructor(lobbyId, lobbyDTO) {
    this.lobbyId = lobbyId;
    this.gameParameters = new GameParameter(lobbyDTO?.GameParameters);
    this.playerList = lobbyDTO.playerList?.map(userData => userData ? new User(userData) : null) || [];
    this.gameState = lobbyDTO.gameState;
    this.hostId = lobbyDTO.hostId;
  }
}

export default Lobby;
