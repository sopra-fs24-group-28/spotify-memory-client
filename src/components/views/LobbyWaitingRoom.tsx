import React, { useCallback, useEffect, useState } from "react";
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
  const initialGameId = location.state?.lobby?.lobbyId;
  const [game, setGame] = useState<Game>();
  const [cardsStates, setCardsStates] = useState();
  const [cardContents, setCardContents] = useState();
  const [scoreBoard, setScoreBoard] = useState(location.state?.scoreBoard || undefined);
  const [leaveInProgress, setLeaveInProgress] = useState(false);


  // navigate back to lobby overview if player did not join lobby through join button
  useEffect(() => {
    if (initialGameId === undefined) {
      navigate("/lobbyoverview");
    }

  }, [initialGameId]);

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
          if (changed) {
            newGame = newGame.doUpdate(key, value);
          }

        }

        return { ...newGame };
      });
    }
    // store all other ws updates to send on later
    if (data.cardsStates?.changed) {
      setCardsStates(data.cardsStates.value);
    }
    if (data.cardContents?.changed) {
      setCardContents(data.cardContents.value);
    }
    if (data.scoreBoard?.changed) {
      // ignoring scoreboard here for now
      // setScoreBoard(data.scoreBoard.value.scoraboard);
    }
  };
  const ws = new WSHandler(`/games/${initialGameId}`, `/queue/games/${initialGameId}`, `app/games/${initialGameId}`, receiverFunction);

  async function fetchData() {
    try {
      if (!(initialGameId === undefined)) {
        const response = await api.get(`/games/${initialGameId}`);
        const gameStart = response.data;
        // instantiating a lobby object here instead of a game object
        // as the ws returns data appropriate for this class. But object is later cast into game when appropriate

        return new Game(initialGameId, gameStart);
      }
    } catch (error) {
      navigate("/lobbyoverview");
      console.log(`Something went wrong while fetching the Game: \n${handleError(error)}`);
    }
  }

  const sendExitRequest = useCallback(async () => {
    try {
      setLeaveInProgress(true);
      await handleLeave();
      window.history.replaceState({}, "");
    } finally {
      setLeaveInProgress(false);
    }
  }, []);

  useEffect(() => {
    const handleTabClose = (event) => {
      if (!leaveInProgress) {
        event.preventDefault();
        sendExitRequest();
      }
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [leaveInProgress, sendExitRequest]);


  useEffect(() => {
    const fetchDataAndConnect = async () => {
      const initGame = await fetchData();
      setGame(initGame);
      await ws.connect();
    };

    fetchDataAndConnect()
      .catch(error => {
        toastNotify("There was an error fetching the data. Please try again.", 1000, "warning");
      });

    return () => {
      ws.disconnect();
    };
  }, []);

  useEffect(() => {
    if (game?.gameState === "ONPLAY") {
      toastNotify("The game starts shortly. Your being redirected...", 500, "normal");
      async () => {
        await ws.disconnect();
      };
      navigate(`/game/${game.gameId}`, {
        state: {
          game: game.serialize(), cardsStates: cardsStates, cardContents: cardContents,
        },
      });
    } else if (game?.gameState === "FINISHED") {
      async () => {
        await ws.disconnect();
      };
      if (!(localStorage.getItem("userId") === String(game?.hostId))) {
        toastNotify("The current lobby has been closed by the host. Create or join another one!", 5000, "warning");
      }
      navigate("/lobbyoverview");
    }
  }, [game]);


  //ComponentSpecific

  async function handleLeave() {

    // rest call that player delete request with
    try {
      const response = await api.delete(`games/${initialGameId}/player`);
      if (response.status === 204) {
        await ws.disconnect();
        navigate("/lobbyoverview");

        return response.status === 204;
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

  return (<div className="BaseContainer">
    <div className="BaseDivLobby">
      <div className="gridhandler">
        <div className="centerwrapper">
          <div
            className={game?.gameParameters.playlist.playlistImageUrl ? "imgContainer" : "spotifyPlaylistContainer"}>
            {game?.gameParameters.playlist.playlistImageUrl ? (<div className="imgandtext">
              {/*<span*/}
              {/*  className="playlist-name second-column-top-item">{game?.gameParameters.playlist.playlistName}</span>*/}
              <img
                src={game?.gameParameters.playlist.playlistImageUrl}
                alt="Spotify Playlist Image"
                className="second-column-top-item-lw img"
              />
              <span className="playlist-name">{game?.gameParameters.playlist.playlistName}</span>
            </div>) : (<SpotifyLogoWithTextSVG width="0.8" height="0.8" />)}
          </div>
          <div className="buttonContainer">
            <Button width="40%" onClick={handleLeave}>Leave</Button>
            {localStorage.getItem("userId") === String(game?.hostId) && game?.playerList.length >= 2 ? (
              <Button width="40%"
                      onClick={handleStart}>{scoreBoard ? "Restart" : "Start"}</Button>) : (localStorage.getItem("userId") === String(game?.hostId) ? (
              <Button width="40%" disabled={true}>Start (Still Waiting..)</Button>) : (<div></div>))}
          </div>


        </div>
        <div className="centerwrapper">
          <div className="playergrid">
            {/* Display players when scoreBoard is not available */}
            {!scoreBoard && (<div>
              <div className="h3-title">These players are already waiting!!</div>
              {game && game.playerList && (<ul className="grid-item">
                {game.playerList.map((user) => (<li key={user.userId} className="grid-item">
                  <UserStatWithIcon user={user} currentStanding={-1} />
                </li>))}
              </ul>)}
            </div>)}
            {scoreBoard && (<div>
              <div className="h3-title">Game Over! Your Scoreboard is:</div>
              {game && game.playerList && (<ul>
                {game.playerList
                  .sort((a, b) => {
                    const rankA = scoreBoard[a.userId]?.rank;
                    const rankB = scoreBoard[b.userId]?.rank;
                    // If rankA or rankB is undefined, treat them as Infinity so they appear at the end

                    return (rankA ?? Infinity) - (rankB ?? Infinity);
                  })
                  .map((user) => (<li key={user.userId} className="grid-item">
                    <UserStatWithIcon
                      user={user}
                      currentStanding={scoreBoard[user.userId]?.score ?? 0 /* Default value */}
                    />
                  </li>))}
              </ul>)}
            </div>)}
          </div>
        </div>
      </div>
    </div>
  </div>);
};


export default LobbyWaitingRoom;

