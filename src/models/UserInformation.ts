class UserInformation {
  userId: number | null;
  username: string | null;
  profileImageUrl: string | null;
  totalGames: number | null;
  setsWon: number | null;
  gamesWon: number | null;
  gamesLoss: number | null;
  gamesAborted: number | null;

  constructor(data: {
    userId?: number,
    username?: string,
    imageUrl?: string,
    totalGames?: number,
    setsWon?: number,
    gamesWon?: number,
    gamesLoss?: number,
    gamesAborted?: number
  } = {}) {
    this.userId = data.userId ?? null;
    this.username = data.username ?? null;
    this.profileImageUrl = data.imageUrl ?? null;
    this.totalGames = data.totalGames ?? null;
    this.setsWon = data.setsWon ?? null;
    this.gamesWon = data.gamesWon ?? null;
    this.gamesLoss = data.gamesLoss ?? null;
    this.gamesAborted = data.gamesAborted ?? null;
  }
}

export default UserInformation

