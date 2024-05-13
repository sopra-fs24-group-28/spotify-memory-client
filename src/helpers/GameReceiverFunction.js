import { useState } from "react";
import Game from "../models/Game";

const receiverFunction = (newDataRaw) => {
  const parsedData = JSON.parse(newDataRaw.body).gameChangesDTO;
  const gameData = parsedData.game;
  const cardData = parsedData.card
  const contentData = cardData.content
  const cardId = cardData.cardId
  const cardsStates = parsedData.cardsStates

  [game, setGame] = useState()

  if (gameData.changed){
    setGame(new Game(gameData.value))
  }


}

