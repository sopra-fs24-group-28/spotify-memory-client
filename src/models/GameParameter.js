class GameParameter {
  constructor(data={}) {
    this.playerLimit = data.playerLimit;
    this.numOfSets = data.numOfSets;
    this.numOfCardsPerSet = data.numOfCardsPerSet;
    this.gameCategory = data.gameCategory;
    this.playlist = data.playlist;
    this.streakStart = data.streakStart;
    this.streakMultiplier = data.streakMultiplier;
    this.timePerTurn = data.timePerTurn;
    this.timePerTurnPowerUp = data.timePerTurnPowerUp;
    // this.playlistImageUrl = "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" ; // TODO: placeholder, is this covered in this.playlist? 
    Object.assign(this, data);
  }
}

export default GameParameter;
