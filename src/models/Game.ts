import GameParameter from "./GameParameter";
import User from "./User";
import { Change } from "../communication/websocket/dto/Change";
import toastNotify from "../helpers/Toast";

class Game {
  private gameId: any;
  private gameParameters: any;
  public playerList: any;
  private gameState: Change | undefined;
  private hostId: Change | undefined;
  private activePlayerStreak: any;
  private history: any;
  private scoreboard: any;
  public activePlayer: any;
  private quickTurnActive: any;
  private quickTurn: any;
  constructor(gameId: any, gameStart) {
    this.gameId = gameId;
    this.gameParameters = new GameParameter(gameStart.gameParameters);
    this.playerList = gameStart.playerList?.map(userData => userData ? new User(userData) : null) || [];
    this.gameState = gameStart?.gameState;
    this.hostId = gameStart?.hostId;

    this.activePlayerStreak =  gameStart.activePlayerid; //todo change name
    this.history = gameStart.history;
    this.scoreboard = gameStart.scoreboard;
    this.activePlayer = gameStart?.activePlayer; //todo change name to sync with backend
    this.quickTurn =  gameStart?.activePlayerid;//todo change name
    this.quickTurnActive =  gameStart?.activePlayerid; //todo change name
  }

  // Method to serialize the Game object to a plain object
  public serialize = () => {
    return {
      gameId: this.gameId,
      gameParameters: this.gameParameters, // Ensure GameParameter class also has a serialize method
      playerList: this.playerList.map(player => player ? player : null), // Ensure User class has a serialize method
      gameState: this.gameState,
      hostId: this.hostId,
      activePlayerStreak: this.activePlayerStreak,
      history: this.history,
      scoreboard: this.scoreboard,
      activePlayer: this.activePlayer,
      quickTurnActive: this.quickTurnActive,
      quickTurn: this.quickTurn
    };
  }

  // Static method to deserialize the object back to a Game instance
  static deserialize = (data: any) => {
    const gameStart = {
      gameParameters: new GameParameter(data.gameParameters), // Ensure GameParameter has a deserialize method
      playerList: data.playerList.map(playerData => playerData ? new User(playerData) : null), // Ensure User has a deserialize method
      gameState: data.gameState,
      hostId: data.hostId,
      activePlayerid: data.activePlayerStreak,
      history: data.history,
      scoreboard: data.scoreboard,
      activePlayer: data.activePlayer,
      quickTurn: data.quickTurn,
      quickTurnActive: data.quickTurnActive
    };

    return new Game(data.gameId, gameStart);
  }

  // Additional setters for each property should be defined here...
  public doUpdate = (key: string, value: any) => {
    if (key === "playerList") {
      if (this.playerList.length > value.length) {
        toastNotify("One Player left", 2000, "warning")
      }
      this.playerList = value;
    }
    else if (key === "gameState") {
      this.gameState = value;
    }
    else if(key === "gameParameters") {
      this.gameParameters = value;
    }
    else if(key === "hostId") {
      this.hostId = value;
    }
    else if(key === "hostId") {
      this.hostId = value;
    }
    else if(key === "activePlayerStreak") {
      this.activePlayerStreak = value;
    }
    else if(key === "history") {
      this.history = value;
    }
    else if(key === "scoreboard") {
      this.scoreboard = value;
    }
    else if(key === "activePlayer") {
      this.activePlayer = value;
    }
    else if(key === "quickTurn") {
      this.quickTurn = value;
    }
    else if(key === "quickTurnActive") {
      this.quickTurnActive = value;
    }
    else {
      console.error("NOT IMPLEMENTED", key);
    }

    return this;
  }

  setPlayers(players){
    this.playerList = players?.map(userData => userData ? new User(userData) : null) || [];
  }

  // Methods to manage players
  addPlayer(userID) {
    this.playerList.push(userID);
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
