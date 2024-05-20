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
  private activePlayerStreakActive: any;
  private history: any;
  private scoreboard: any;
  public activePlayer: any;

  constructor(gameId: any, gameStart) {
    this.gameId = gameId;
    this.gameParameters = new GameParameter(gameStart.gameParameters);
    this.playerList = gameStart.playerList?.map(userData => userData ? new User(userData) : null) || [];
    this.gameState = gameStart?.gameState;
    this.hostId = gameStart?.hostId;
    this.history = gameStart.history;
    this.scoreboard = gameStart.scoreboard;
    this.activePlayer = gameStart?.activePlayer;
    this.activePlayerStreakActive = gameStart?.activePlayerStreakActive
  }

  // Method to serialize the Game object to a plain object
  public serialize = () => {
    return {
      gameId: this.gameId,
      gameParameters: this.gameParameters, // Ensure GameParameter class also has a serialize method
      playerList: this.playerList.map(player => player ? player : null), // Ensure User class has a serialize method
      gameState: this.gameState,
      hostId: this.hostId,
      activePlayerStreakActive: this.activePlayerStreakActive,
      history: this.history,
      scoreboard: this.scoreboard,
      activePlayer: this.activePlayer,
    };
  }

  // Static method to deserialize the object back to a Game instance
  static deserialize = (data: any) => {
    const gameStart = {
      gameParameters: new GameParameter(data.gameParameters), // Ensure GameParameter has a deserialize method
      playerList: data.playerList.map(playerData => playerData ? new User(playerData) : null), // Ensure User has a deserialize method
      gameState: data.gameState,
      hostId: data.hostId,
      activePlayerStreakActive: data.activePlayerStreakActive,
      history: data.history,
      scoreboard: data.scoreboard,
      activePlayer: data.activePlayer,
    };

    return new Game(data.gameId, gameStart);
  }

  // Additional setters for each property should be defined here...
  public doUpdate = (key: string, value: any) => {
    if (key === "playerList") {
      // shows toasty notification if playerList has decreased and if player is not the one who left     
      if (this.playerList.length > value.length && value.map(obj => obj.userId).includes(Number(localStorage.getItem("userId")))) {
        setTimeout(() => { // timeout trick to prevent toasty from firing right when react is in the middle of a re-render
          toastNotify("One Player left", 2000, "warning");
        }, 0);  
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
    else if(key === "activePlayerStreakActive") {
      this.activePlayerStreakActive = value;
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
    else {
      console.error("NOT IMPLEMENTED", key);
    }

    return this;
  }

}


export default Game;
