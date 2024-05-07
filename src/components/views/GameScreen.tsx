import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "styles/views/GameScreen.scss";
// @ts-ignore
import Card from "../ui/Card";
import Game from "models/Game";
import CardObject from "../../models/CardObject";
import { Button } from "../ui/Button";
import WebPlayback from "../ui/Player";
import { Client } from "@stomp/stompjs";
import { getWSDomain } from "helpers/getDomain";
import toastNotify from "../../helpers/Toast";
import { api } from "helpers/api";
import { UserStatWithIcon } from "../ui/UserStatWithIcon"


const GameScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [game, setGame] = useState(() => Game.deserialize(location.state.game));
  const [cardsStates, setCardsStates] = useState(() =>
    Object.entries(location.state.cardsStates.cardStates).map(([cardId, cardState]) =>
      new CardObject(cardId, cardState),
    ),
  );
  const [scoreBoard, setScoreBoard] = useState();
  const [stompClient, setStompClient] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [showMessage, setShowMessage] = useState("");

  const [deviceIdGame, setDeviceIdGame] = useState("");
  const [player, setPlayer] = useState(null);

  const [yourTurn, setYourTurn] = useState(false);
  const [countdown, setCountdown] = useState(0); // Timer state


  const setPlayerCallback = useCallback((playerObj) => {
    setPlayer(playerObj);
  }, []);

  const sendExitRequest = useCallback(() => {
   handleLeaveGame();
  }, [game.gameId]);

  useEffect(() => {
    const handleTabClose = (event) => {
      event.preventDefault();
      sendExitRequest();
    };

    window.addEventListener("beforeunload", handleTabClose);
    
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [sendExitRequest]);

  const disconnectPlayer = () => {
    if (player) {
      player.disconnect();
    }
  };

  const handleDeviceIdReceived = (deviceId) => {
    setDeviceIdGame(deviceId);
  };


  const updatePlayerIndication = () => {
    const currentPlayer = game.playerList.find(user => user.userId === game.activePlayer);
    setYourTurn(currentPlayer.userId === Number(localStorage.getItem("userId")));
    setShowMessage(`${currentPlayer.userId === Number(localStorage.getItem("userId")) ? "Your" : currentPlayer.username + "'s"} Turn`);
    setCountdown(game.gameParameters.timePerTurn);
  };

  useEffect(() => {
    updatePlayerIndication();
  }, [game.activePlayer]);

  const handleInactive = useCallback(() => {
      // api.put(`games/${game.gameId}/inactive`);
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (countdown > 0) {
      timeoutId = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (yourTurn) {
      handleInactive();
    }
    
    return () => clearTimeout(timeoutId);
  }, [countdown]);


  // Receiver function
  const receiverFunction = useCallback((newDataRaw) => {
    const data = JSON.parse(newDataRaw.body);
    const { gameChangesDto, cardsStates, cardContent, scoreBoard } = data;

    if (gameChangesDto?.changed) {
      setGame(prevGame => {
        let newGame = { ...prevGame };
        for (const key in gameChangesDto.value) {
          const { changed, value } = gameChangesDto.value[key];
          if (changed) {
            if (key === "activePlayer" && value === game.activePlayer) {
              updatePlayerIndication();
            }
            newGame = newGame.doUpdate(key, value);
          }
        }

        return { ...newGame };
      });
    }

    // Setting up new cards
    if (cardsStates?.changed) {
      setCardsStates(prevCardsStates => {
        const newCards = Object.entries(cardsStates.value.cardStates).map(([cardId, cardState]) =>
          new CardObject(cardId, cardState));

        return newCards;
      });
    }

    // Updating card content
    if (cardContent?.changed) {
      setCardsStates(prevCards => {

        return prevCards.map(card => {
          if (card.cardId === String(cardContent.value.cardId)) {
            const updatedCard = new CardObject(card.cardId,  card.cardState );
            updatedCard.setContent(cardContent.value)

            return updatedCard;
          }

          return card;
        });
      });
    }

    if (scoreBoard?.changed) {      
      setScoreBoard(scoreBoard.value.scoreboard);
    }
  }, []);


  // WebSocket setup
  useEffect(() => {
    const client = new Client({
      brokerURL: `${getWSDomain()}?token=${localStorage.getItem("token")}`,
      onConnect: () => {
        client.subscribe(`/queue/games/${game.gameId}`, receiverFunction);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [receiverFunction, game.gameId]);

  // Flip card function
  function flip(card) {
    if(!yourTurn){
      toastNotify("Its not your turn so you cannot flip a card.", 2000, "normal")
    } else {
    const data = JSON.stringify({ cardId: Number(card.cardId) });
    stompClient.publish({
      destination: `/app/games/${game.gameId}`,
      body: data,
    });
  }}


  useEffect(() => {
    if (game?.gameState === "OPEN") {
      disconnectPlayer();
      stompClient.deactivate()
      navigate(`/lobby/${game.gameId}`, { state: { lobby: {lobbyId : game.gameId}, scoreBoard : scoreBoard } });
    } else if (game?.gameState === "FINISHED") {
      disconnectPlayer();
      stompClient.deactivate()
      navigate(`/lobbyoverview`);
    }
  }, [game]);

  function handleLeaveGame() {
    try {
      api.delete(`/games/${game.gameId}/player`)
      navigate("/lobbyoverview")
    } catch (error) {
      toastNotify("There was an error trying to leave the game. Please try again.", 1000, "warning");
    }
  }


  return (
    <div>
      <div>{game.gameParameters.activePlayer}</div>
      <script src="https://sdk.scdn.co/spotify-player.js"></script>
      <div className="BaseContainer">
        <div className="screen-gridhandler">

          <div className="BaseDivGame col6">
            <div className="basicCardContainer">
              {cardsStates.map((card, index) => (
                <Card key={card.cardId} cardobj={card} flip={() => flip(card)} />
              ))}
            </div>
          </div>
          <div className="BaseDivGame col7">
            <div className="gridhandler-stats">

              {/*<div className="gameMessageposition">*/}
              {/*  {showMessage && !gameFinished &&*/}
              {/*    <div className={yourTurn ? "gameMessageContaineralert" : "gameMessageContainer"}>*/}
              {/*      <div className="gameMessage">{showMessage}</div>*/}
              {/*    </div>}*/}
              {/*</div>*/}
              {game?.gameParameters?.gameCategory === "STANDARDSONG" && <div className="spotifyplayercontainer">
                <WebPlayback token={localStorage.getItem("accessToken")} onDeviceIdReceived={handleDeviceIdReceived}
                             setPlayer={setPlayerCallback} />
              </div>}
              <div className="juhu">
                <div className={yourTurn ? "gameMessageContaineralert" : "gameMessageContainer"}>
                  <div className="gameMessage">{showMessage} - {countdown} sec</div>
                </div>
                {/* <h2 className="h2-title">Current Score</h2> */}
                {scoreBoard ?
                <ul className="grid-item">
                    {game.playerList.sort((a, b) => scoreBoard[a.userId].rank - scoreBoard[b.userId].rank).map((user) => (
                        <li key={user.userId} className="grid-item">
                          <div className="usr">
                            <UserStatWithIcon user={user} currentStanding={scoreBoard[user.userId].rank} />
                          </div>
                        </li>
                      ))}
                </ul>
                :
                <ul className="grid-item">
                  {game.playerList.map((user) => (
                    <li key={user.userId} className="grid-item">
                      <div className="usr">
                        <UserStatWithIcon user={user}  currentStanding={1} />
                      </div>
                    </li>
                    ))}
                </ul>
                }
              </div>
              <div>
                <Button width={"100%"} onClick={handleLeaveGame}>Leave Game</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default GameScreen;
