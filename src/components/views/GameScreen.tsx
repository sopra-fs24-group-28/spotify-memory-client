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


const GameScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [game, setGame] = useState(() => Game.deserialize(location.state.game));
  const [cardsStates, setCardsStates] = useState(() =>
    Object.entries(location.state.cardsStates.cardStates).map(([cardId, cardState]) =>
      new CardObject(cardId, cardState),
    ),
  );
  const [scoreBoard, setScoreBoard] = useState(location.state.scoreBoard);
  const [stompClient, setStompClient] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [showMessage, setShowMessage] = useState("");

  const [deviceIdGame, setDeviceIdGame] = useState("");
  const [player, setPlayer] = useState(null);

  const [yourTurn, setYourTurn] = useState(false); // boolean
  const [intervals, setIntervals] = useState(null); // timer object id used to reset etc. 
  const [countdown, setCountdown] = useState(0); // Timer state displayed
  const [excludedCount, setExcludedCount] = useState(0);


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
      console.log("disconnecting player from gamescreen");
      player.disconnect();
      console.log(player);
    }
  };

  const handleDeviceIdReceived = (deviceId) => {
    setDeviceIdGame(deviceId);
  };

  useEffect(() => {
    if (countdown === 0 && yourTurn && (cardsStates.filter(c => c.cardState === "FACEUP").length) < 2) {
      api.put(`/games/${game.gameId}/inactive`);
    }    
  }, [countdown]); 
  
  useEffect(() => {
    
    // clear existing interval
    setIntervals(prevIntervals => {
      clearInterval(prevIntervals);
      return null;
    });

    // set active player bool and message
    const currentPlayer = game.playerList.find(user => user.userId === game.activePlayer);
    setYourTurn(currentPlayer.userId === Number(localStorage.getItem("userId")));
    setShowMessage(`${currentPlayer.userId === Number(localStorage.getItem("userId")) ? "Your" : currentPlayer.username + "'s"} Turn`);
   
    // set new timer and interval
    setCountdown(game.gameParameters.timePerTurn);
    const temp = setInterval(() => {
      setCountdown((prevCountdown) => { return prevCountdown - 1 });
    }, 1000)
    setIntervals(temp);

  }, [game.activePlayer]);

  // used to find if a match was found to reset the turn timer
  useEffect(() => {
    const nExcluded = cardsStates.filter(c => c.cardState === "EXCLUDED").length;
    setExcludedCount(prevExcl => {
      if (nExcluded > prevExcl) {
        setCountdown(game.gameParameters.timePerTurn);
      }
      return nExcluded 
    })    
  }, [cardsStates])


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
            console.log(updatedCard);

            return updatedCard;
          }

          return card;
        });
      });
    }

    if (scoreBoard?.changed) {
      console.error("Scoreboard changed, but not implemented yet");
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
    if (game?.gameState === "FINISHED") {
      disconnectPlayer();
      stompClient.deactivate()
      navigate(`/lobby/${game.gameId}`, { state: { lobby: {lobbyId : game.gameId}, scoreBoard : scoreBoard } });
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
              <div className="stats">
                <div className={yourTurn ? "gameMessageContaineralert" : "gameMessageContainer"}>
                  <div className="gameMessage">{showMessage} - {countdown} sec</div>
                </div>
                <h2 className="h2-title">Current Score</h2>
                {/*<UserStatWithIcon className="test" username={"Henry"} currentStanding={"1"} />*/}
                {/*<UserStatWithIcon username={"Elias"} currentStanding={"2"} />*/}
                {/*<UserStatWithIcon username={"Niklas"} currentStanding={"3"} />*/}
                {/*<UserStatWithIcon username={"Diyar"} currentStanding={"4"} />*/}
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
