import GameParameter from "./GameParameter";
import User from "./User";

class Game {
  constructor(gameId, gameStart) {    
    this.gameId = gameId;
    this.gameParameters = new GameParameter(gameStart.gameParameters);
    this.playerList = gameStart?.playerList?.map(userData => userData ? new User(userData) : null) || [];
    this.gameState = gameStart?.gameState;
    this.hostId = gameStart?.hostId;

    this.activePlayerStreak =  gameStart.activePlayerid; //todo change name
    this.history = gameStart.history;
    this.scoreboard = gameStart.scoreboard;
    this.activePlayer = gameStart; //todo change name to sync with backend
    this.quickTurn =  gameStart.activePlayerid;//todo change name
    this.quickTurnActive =  gameStart.activePlayerid; //todo change name
  }
  get gameParameter() {
    return this._gameParameter;
  }

  set gameParameter(value) {
    this._gameParameter = value;
  }

  get gameId() {
    return this._gameId;
  }

  set gameId(value) {
    this._gameId = value;
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
  updateGame(key, value) {
    // DONT USE THIS
    this[key] = value;

    return this; 
  }

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
