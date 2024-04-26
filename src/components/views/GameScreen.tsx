import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "styles/views/GameScreen.scss";
// @ts-ignore
import Card from "../ui/Card";
import Game from "models/Game";
import WSHandler from "../../helpers/wsHandler.js";
import CardObject from "../../models/CardObject";
import { Button } from "../ui/Button";
import WebPlayback from "../ui/Player";
import { UserStatWithIcon } from "../ui/UserStatWithIcon";
import { Client } from "@stomp/stompjs";

const GameScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [game, setGame] = useState(() => Game.deserialize(location.state.game));
  const [cardsStates, setCardsStates] = useState(() =>
    Object.entries(location.state.cardsStates.cardStates).map(([cardId, cardState]) =>
      new CardObject(cardId, cardState)
    )
  );
  const [scoreBoard, setScoreBoard] = useState(location.state.scoreBoard);
  const [stompClient, setStompClient] = useState(null);

  // Receiver function
  const receiverFunction = useCallback((newDataRaw) => {
    const data = JSON.parse(newDataRaw.body);
    const gameChanges = data.gameChangesDto;
    if (!gameChanges.changed) {
      return;
    } else {
      setGame(prevGame => {
        let newGame: Game = { ...prevGame };
        for (const key in gameChanges.value) {
          const changed = gameChanges.value[key].changed;
          const value = gameChanges.value[key].value;
          // console.log(key, changed, value);
          if (changed) {
            newGame = newGame.doUpdate(key, value);
          }
        }

        return { ...newGame };
      });
    }

    // setting up new cards
    if (data.cardsStates.changed) {
      const newCards = [];
      for (const cardId in data.cardsStates.value.cardStates) {
        newCards.push(new CardObject(cardId, data.cardsStates.value.cardStates[cardId]));
      }
      setCardsStates(newCards);
    }

    if (data.cardContent.changed) {
      setCardsStates(prevCards => {
        const cardToUpdate = data.cardContent.value.cardId;
        const newCards = [];
        for (const cardIdx in prevCards) {
          const card: CardObject = prevCards[cardIdx];
          console.log(data.cardContent.value);
          console.log(card, card.cardId, cardToUpdate);
          if (card.cardId === String(cardToUpdate)) {
            console.log("match");
            card.setContent({ ...data.cardContent.value });
          }
          newCards.push(card);
        }
        console.log("new cards + content", newCards);

        return newCards;
      });
    }

    if (data.scoreBoard.changed) {
      console.error("Scoreboard changed, but not implemented yet");
    }
    // console.log(data);
  }, []);

  // WebSocket setup
  useEffect(() => {
    const client = new Client({
      brokerURL: `ws://localhost:8080/ws?token=${localStorage.getItem("token")}`,
      onConnect: () => {
        client.subscribe(`/queue/games/${game.gameId}`, receiverFunction);
      }
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [receiverFunction, game.gameId]);

  // Flip card function
  function flip(card) {
    const data = JSON.stringify({ cardId: Number(card.cardId), deviceId: Number(card.cardId) });
    stompClient.publish({
      destination: `/app/games/${game.gameId}`,
      body: data
    });
  }

  return (
    <div className="BaseContainer">
      <div className="screen-gridhandler">
        <div className="BaseDivGame col6">
          <div className="basicCardContainer">
            {cardsStates.map((card, index) => (
              <Card key={card.cardId} isFlipped={card.cardState} cardobj={card} flip={() => flip(card)} />
            ))}
          </div>
        </div>
        <div className="BaseDivGame col7">
          {/* Additional UI components */}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;