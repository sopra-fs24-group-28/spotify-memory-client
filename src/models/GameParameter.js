class GameParameter {
  constructor(data = {}) {
    this.gameId = null;
    this.playerLimit = data.playerLimit || 4;
    this.numberOfSets = data.numberOfSets || 1;
    this.numberOfCardsPerSet = data.numberOfCardsPerSet || 2;
    this.category = data.category || null;
    this.playlist = data.playlist || '';
    this.streakStart = data.streakStart || 3;
    this.streakMultiplier = data.streakMultiplier || 2;
    this.timePerTurnNormal = data.timePerTurnNormal || 10;
    this.timePerTurnPowerup = data.timePerTurnPowerup || 5;
  }



}

export default GameParameter;
