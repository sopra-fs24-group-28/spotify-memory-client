class Game {
  constructor(gameID) {
    this._gameID = gameID;
    this._activePlayer = null; // Integer (userID)
    this._activePlayerStreak = 0; // Integer
    this._state = null; // An instance of GameState (assuming this is another class or enum)
    this._host = null; // Integer (userID)
    this._gameParameter = null; // An instance of GameParameters
    this._history = []; // Array of Turns
    this._scoreboard = new Map(); // Map of usernames to points
    this._players = []; // Array of Users
    this._quickTurn = new Map(); // Map of usernames to counter
    this._quickTurnActive = false;
  }

  get gameParameter() {
    return this._gameParameter;
  }

  set gameParameter(value) {
    this._gameParameter = value;
  }

  get gameID() {
    return this._gameID;
  }

  set gameID(value) {
    this._gameID = value;
  }

  get activePlayer() {
    return this._activePlayer;
  }

  set activePlayer(value) {
    this._activePlayer = value;
  }

  get activePlayerStreak() {
    return this._activePlayerStreak;
  }

  set activePlayerStreak(value) {
    this._activePlayerStreak = value;
  }

  get state() {
    return this._state;
  }

  set state(value) {
    this._state = value;
  }

  get host() {
    return this._host;
  }

  set host(value) {
    this._host = value;
  }

  get parameters() {
    return this._parameters;
  }

  set parameters(value) {
    this._parameters = value;
  }

  get history() {
    return this._history;
  }

  set history(value) {
    this._history = value;
  }

  get scoreboard() {
    return this._scoreboard;
  }

  set scoreboard(value) {
    this._scoreboard = value;
  }

  get players() {
    return this._players;
  }

  set players(value) {
    this._players = value;
  }

  get quickTurn() {
    return this._quickTurn;
  }

  set quickTurn(value) {
    this._quickTurn = value;
  }

  get quickTurnActive() {
    return this._quickTurnActive;
  }

  set quickTurnActive(value) {
    this._quickTurnActive = value;
  }


  // Additional setters for each property should be defined here...

  // Methods to manage players
  addPlayer(userID) {
    this._players.push(userID);
  }

  removePlayer(userID) {
    // Logic to remove a player by userID
    // Return true if successful, false otherwise
  }

  // Game control methods
  terminateGame() {
    // Logic to terminate the game
    // Return true if successful, false otherwise
  }

  startGame() {
    // Logic to start the game
  }

  runTurn() {
    // Logic for running a turn
  }

  resetGame(resetScoreboard = false) {
    // Logic to reset the game
    // Optionally reset the scoreboard based on the argument
  }
}


export default Game;
