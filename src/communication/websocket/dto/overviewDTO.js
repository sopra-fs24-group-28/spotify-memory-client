import Lobby from "models/Lobby"

class OverViewDTO {
  constructor() {
    this.Lobbies = {};
  }

  addOrUpdateGame(gameID, data) {
    //add game
    this.Lobbies[gameID] = new Lobby(data);
  }

  getGame(gameID) {
    // return the Lobby instance for the given gameID, or undefined if not found
    return this.Lobbies[gameID];
  }

  removeGame(gameID) {
    // remove game with gameID
    delete this.Lobbies[gameID];
  }
}

export default OverViewDTO;
