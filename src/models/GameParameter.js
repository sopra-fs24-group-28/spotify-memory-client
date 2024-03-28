class GameParameter {
  constructor(data = {}) {
    this.gameId = data.gameId ;
    this.playerLimit = data.playerLimit ;
    this.numberOfSets = data.numberOfSets;
    this.numberOfCardsPerSet = data.numberOfCardsPerSet ;
    this.category = data.category;
    this.playlist = data.playlist;
    this.streakStart = data.streakStart ;
    this.streakMultiplier = data.streakMultiplier;
    this.timePerTurnNormal = data.timePerTurnNormal;
    this.timePerTurnPowerup = data.timePerTurnPowerup;
    Object.assign(this, data);
  }



}

export default GameParameter;
