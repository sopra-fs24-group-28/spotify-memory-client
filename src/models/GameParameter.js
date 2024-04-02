class GameParameter {
  constructor(data = {}) {
    this.playerLimit = data.playerLimit;
    this.numOfSets = data.numOfSets;
    this.numOfCardsPerSet = data.numOfCardsPerSet;
    this.gameCategory = data.gameCategory;
    this.playlist = data.playlist;
    this.streakStart = data.streakStart;
    this.streakMultiplier = data.streakMultiplier;
    this.timePerTurn = data.timePerTurn;
    this.timePerTurnPowerUp = data.timePerTurnPowerUp;
    Object.assign(this, data);
  }



}

export default GameParameter;
