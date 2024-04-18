import Lobby from "models/Lobby"
import { Change } from "./Change";

class OverViewDTO {
  gameParameter: Change;
  playerList: Change;
  gameState: Change;
  hostId: Change;


/*  constructor() {
    this.Lobbies = {};
  }

  addOrUpdateGame(gameID, data) {
    //add game
    this.Lobbies[gameID] = new Lobby(gameID, data);
  }

  getGame(gameID) {
    // return the Lobby instance for the given gameID, or undefined if not found
    return this.Lobbies[gameID];
  }

  removeGame(gameID) {
    // remove game with gameID
    delete this.Lobbies[gameID];
  }*/
}

export default OverViewDTO;
