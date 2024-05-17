class CardObject {
  public cardId: string;
  private cardState: string;
  private songId: string;
  private imageUrl: string;

  constructor(id, state) {
    this.cardId = id;
    this.cardState = state;
    this.songId = null; 
    this.imageUrl = null;
  }

  public setContent(content: any) {    
    this.songId = content[1];
    this.imageUrl = content[2];
  }
} 

export default CardObject
