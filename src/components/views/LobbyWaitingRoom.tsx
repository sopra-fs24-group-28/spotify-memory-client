import React, { useEffect, useState } from "react";
import "styles/views/LobbyWaitingRoom.scss";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { UserStatWithIcon } from "../ui/UserStatWithIcon";
import { api, handleError } from "helpers/api";
import SpotifyLogoWithTextSVG from "../ui/icons-svg/SpotifyLogoWithTextSVG";
import WSHandler from "../../helpers/wsHandler.js";
import Game from "models/Game";
import toastNotify from "../../helpers/Toast";


const LobbyWaitingRoom = () => {
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  // TODO: handle situation where location.state.lobby is undefined
  const initialGameId = location.state.lobby.lobbyId;
  const [game, setGame] = useState<Game>();
  const [cardsStates, setCardsStates] = useState();
  const [cardContent, setCardContent] = useState();
  const [scoreBoard, setScoreBoard] = useState(location.state?.scoreBoard || undefined);

  
  //Websocket specific
  const receiverFunction = (newDataRaw) => {
    const data = JSON.parse(newDataRaw.body);
    // handling only gameChanges here, because other parts of game will not change in wainting room
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
    // store all other ws updates to send on later
    if (data.cardsStates.changed) {
      setCardsStates(data.cardsStates.value);
    }
    if (data.cardContent.changed) {
      setCardContent(data.cardContent.value);
    }
    if (data.scoreBoard.changed) {
      setScoreBoard(data.scoreBoard.value);
    }
    console.log(data);
  };
  const ws = new WSHandler(`/games/${initialGameId}`,
    `/queue/games/${initialGameId}`,
    `app/games/${initialGameId}`,
    receiverFunction);

  async function fetchData() {
    try {
      const response = await api.get(`/games/${initialGameId}`);
      const gameStart = response.data;
      // instantiating a lobby object here instead of a game object
      // as the ws returns data appropriate for this class. But object is later cast into game when appropriate

      return new Game(initialGameId, gameStart);

    } catch (error) {
      console.error(`Something went wrong while fetching the Game: \n${handleError(error)}`);
    }
  }


  useEffect(() => {
    const fetchDataAndConnect = async () => {
      const initGame = await fetchData();
      setGame(initGame);
      await ws.connect();
    };

    fetchDataAndConnect()
      .catch(error => {
        toastNotify("There was an error fetching the data. Please try again.", 1000);
      });  }, []);

  useEffect(() => {
    // TODO: this should show a message to a user
    if (game?.gameState === "ONPLAY") {
      toastNotify("The game starts shortly. Your being redirected...", 500)
      async () => {
        await ws.disconnect();
      };
      navigate(`/game/${game.gameId}`, {
        state: {
          game: game.serialize(),
          cardsStates: cardsStates,
          cardContent: cardContent,
          scoreBoard: scoreBoard,
        },
      });
    } else if (game?.gameState === "FINISHED") {
      async () => {
        await ws.disconnect();
      };
      navigate("/lobbyOverview");
    }
  }, [game]);


  //ComponentSpecific

  async function handleLeave() {

    // rest call that player delete request with
    try {
      const response = await api.delete(`games/${initialGameId}/player`);
      if (response.status === 204) {
        await ws.disconnect();
        navigate("/lobbyOverview");
      } else {
        alert("There was a error when trying to leave the lobby. Please try again later");
      }

    } catch (error) {
      alert(`Something went wrong while trying to leave the lobby. \n${handleError(error)}`);
    }
  }

  async function handleStart() {
    try {
      const response = await api.post(`games/${initialGameId}/start`);
      if (response.status === 200) {
      } else {
        alert("There was a error when trying start a game. Please contact admin.");
      }

    } catch (error) {
      alert(`Something went wrong when starting a Game. Please try again. \n${handleError(error)}`);
    }
  }

  return (
    <div className="BaseContainer">
      <div className="BaseDivLobby">
        <div className="gridhandler">
          <div className="centerwrapper">
            <div
              className={game?.gameParameters.playlist.playlistImageUrl ? "imgContainer" : "spotifyPlaylistContainer"}>
              {game?.gameParameters.playlist.playlistImageUrl ? (
                <div>
                <span
                  className="playlist-name second-column-top-item">{game?.gameParameters.playlist.playlistName}</span>
                  <img
                    src={game?.gameParameters.playlist.playlistImageUrl}
                    alt="Spotify Playlist Image"
                    width="100%"
                    height="100%"
                    className="img"
                  />
                </div>
              ) : (
                <SpotifyLogoWithTextSVG width="0.8" height="0.8" />
              )}
            </div>

              <div className="buttonContainer">
                <Button width="65%" onClick={handleLeave}>Leave</Button>

                {/* only show this if player is host and */}
                {localStorage.getItem("userId") === String(game?.hostId) && game?.playerList.length >= 2 ?
                  <Button width="65%" onClick={handleStart}>{scoreBoard ? "Restart" : "Start"}</Button> : <div></div>}
              </div>

          </div>
          <div className="centerwrapper">
            <div className="playergrid">
              {/* Display players when scoreBoard is not available */}
              {!scoreBoard && (
                <div>
                  <div className="h3-title">These players are already waiting!!</div>
                  {game && game.playerList && (
                    <ul className="grid-item">
                      {game.playerList.map((user) => (
                        <li key={user.userId} className="grid-item">
                          <UserStatWithIcon user={user} currentStanding={0} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Display players with scoreboard when scoreBoard is available */}
              {scoreBoard && (
                <div>
                  <div className="h3-title">Game Over!</div>
                  {game && game.playerList && (
                    <ul className="grid-item">
                    {game.playerList.sort((a, b) => scoreBoard[a.userId] - scoreBoard[b.userId]).map((user) => (
                        <li key={user.userId} className="grid-item">
                          <UserStatWithIcon user={user} currentStanding={scoreBoard[user.userId]} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default LobbyWaitingRoom;

