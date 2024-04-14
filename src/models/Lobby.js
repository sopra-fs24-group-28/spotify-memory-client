import GameParameter from "./GameParameter";
import User from "./User";

class Lobby {
  constructor(lobbyId, lobbyDTO) {
    this.lobbyId = lobbyId;
    this.gameParameters = new GameParameter(lobbyDTO?.gameParameters);
    this.users = lobbyDTO.userList?.map(userData => userData ? new User(userData) : null) || [];
    this.gameState = lobbyDTO.gameState;
    this.hostId = lobbyDTO.hostId;
  }
}

export default Lobby;
