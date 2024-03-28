class OverViewDTO {
  constructor() {
    this.Lobbies = {};
  }

  addOrUpdateGame(gameID, data) {
    // This method creates a new Lobby instance with the provided data or updates an existing one
    this.Lobbies[gameID] = new Lobby(data);
  }

  getGame(gameID) {
    // This method returns the Lobby instance for the given gameID, or undefined if not found
    return this.Lobbies[gameID];
  }

  removeGame(gameID) {
    // This method removes the Lobby instance associated with the given gameID
    delete this.Lobbies[gameID];
  }
}

export default OverViewDTO;
