import GameParameter from "./GameParameter";
import User from "./User";

class Lobby {
  constructor(lobbyDTO) {
    this.gameParamers = new GameParameter(lobbyDTO.gameParamers);
    this.Useres = lobbyDTO.userList.map(userData => new User(userData));
    this.gameState = lobbyDTO.gameState;
    this.hostId = lobbyDTO.hostId;
  }
}

export default Lobby;
