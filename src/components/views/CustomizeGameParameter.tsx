import React, { useEffect, useState } from "react";
import "styles/views/CustomizeGameParameter.scss";
import { api, handleError } from "helpers/api";
import GameParameter from "../../models/GameParameter";
import Game from "../../models/Game.js";
import { useNavigate } from "react-router-dom";
import { getSpotifyPlaylist } from "../../helpers/spotifyrelated/getPlaylists";
import { Button } from "components/ui/Button"
import { updateFunctionDeclaration } from "typescript";


const CustomizeGameParameter = () => {
  const navigate = useNavigate();
  const [playerLimit, setPlayerLimit] = useState(4);
  const [numOfSets, setNumOfSets] = useState(1);
  const [numOfCardsPerSet, setNumOfCardsPerSet] = useState(2);
  const [gameCategory, setGameCategory] = useState("STANDARDALBUMCOVER");
  const [playlist, setPlaylist] = useState();
  const [streakStart, setStreakStart] = useState(3);
  const [streakMultiplier, setStreakMultiplier] = useState(2);
  const [timePerTurn, setTmePerTurn] = useState(10);
  const [timePerTurnPowerUp, setTmePerTurnPowerUp] = useState(12);
  const [gameParameters, setGameParameters] = useState();
  const [errorMessages, setErrorMessages] = useState<string>("");
  const [availablePlaylists, setAvailablePlaylists] = useState([]);

  useEffect(() => {
    async function fetchAvailablePlaylists() {
      try {
        const playlists = await getSpotifyPlaylist();
        setAvailablePlaylists(playlists);
        console.log(availablePlaylists);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    }

    fetchAvailablePlaylists();
  }, []);

  function startGame(e) {
    e.preventDefault();
    // Validation conditions
    const validations: {
      check: () => boolean, errorMessage: string
    }[] = [{
      check: () => !playerLimit || playerLimit <= 0, errorMessage: "Please enter a positive player limit.",
    }, {
      check: () => !numOfSets || numOfSets <= 0, errorMessage: "Please enter a positive number of sets.",
    }, {
      check: () => !numOfCardsPerSet || numOfCardsPerSet <= 0,
      errorMessage: "Please enter a positive number of cards per set.",
    }, { check: () => !gameCategory, errorMessage: "Please select a gameCategory." }, {
      check: () => !playlist, errorMessage: "Please select a playlist.",
    }, {
      check: () => !streakStart || streakStart <= 0,
      errorMessage: "Please select a positive number for the streak start.",
    }, {
      check: () => !streakMultiplier || streakMultiplier <= 1,
      errorMessage: "Please select a positive number greater than one for the streak multiplier.",
    }, {
      check: () => !timePerTurn || timePerTurn < 10 || timePerTurn > 60,
      errorMessage: "Please select a positive number between 10 and 60 seconds for normal turn time.",
    }, {
      check: () => !timePerTurnPowerUp || timePerTurnPowerUp < 10 || timePerTurnPowerUp > 60,
      errorMessage: "Please select a positive number between 10 and 60 seconds for powerup turn time.",
    }];

    // Check each validation condition
    const invalidMessages = validations.filter(({ check }) => check()).map(({ errorMessage }) => errorMessage);
    const errorMessage = invalidMessages.join("\n").trim();

    if (errorMessage) {
      setErrorMessages(errorMessage);

      return;
    }

    setGameParameters(new GameParameter({
      playerLimit: playerLimit,
      numOfSets: numOfSets,
      numOfCardsPerSet: numOfCardsPerSet,
      gameCategory: gameCategory,
      playlist: playlist,
      streakStart: streakStart,
      streakMultiplier: streakMultiplier,
      timePerTurn: timePerTurn,
      timePerTurnPowerUp: timePerTurnPowerUp,
    }));
  }

  useEffect(() => {
    if (gameParameters) {
      sendLobbyCreationRequest();
    }
  }, [gameParameters]);


  async function sendLobbyCreationRequest() {
    try {
      const requestBody = JSON.stringify(gameParameters);
      const response = await api.post("/game", requestBody);

      if (response.status === 201) {
        //setting up the game
        let game: Game;
        let returnedGameParameters: GameParameter;

        returnedGameParameters = new GameParameter(response.data.gameParameters);
        console.log(returnedGameParameters);
        game = new Game(response.data.gameId);
        game.gameParameter = returnedGameParameters;
        game.host = localStorage.getItem("userId"); //TODO: redirect this task to backenend once they are ready
        game.addPlayer(game.host); //TODO:  remove once backend is ready

        //TODO: Initialise game Websocket
        //...
        navigate(`/lobby/${response.data.gameId}`, { state: { lobby: returnedGameParameters } }); //TODO this is mocked, remove once its ready

      } else {
        alert("Something went wrong setting up the lobby.");
      }
    } catch (error) {
      alert(`Something went wrong setting up the lobby. \n${handleError(error)}`);
    }
  }

  function cancel() {
    navigate("/lobbyOverview")
  }


  return (<>
      <div className="BaseContainer">
        <div className="BaseDiv">
          <div className="title-section">
            <h2 className="h2-title">Customize your Game!</h2>
          </div>
          <form className="input-section" onSubmit={startGame}>
            <div className="grid">
              <div className={"inputpair"}>
                <label className="label" htmlFor="playerLimit">Player Limit:</label>
                <input
                  id="playerLimit"
                  className="normalInput"
                  value={playerLimit}
                  type="number"
                  onChange={e => setPlayerLimit(e.target.value)}
                />
              </div>
              <div className={"inputpair"}>
                <label className="label" htmlFor="numOfSets">Number of Sets:</label>
                <input
                  id="numOfSets"
                  className="normalInput"
                  type="number"

                  value={numOfSets}
                  onChange={e => setNumOfSets(e.target.value)}
                />
              </div>
              <div className={"inputpair"}>
                <label className="label" htmlFor="numOfCardsPerSet">Cards per Set:</label>
                <input
                  id="numOfCardsPerSet"
                  className="normalInput"
                  type="number"
                  placeholder="Number of Cards per Set"
                  value={numOfCardsPerSet}
                  onChange={e => setNumOfCardsPerSet(e.target.value)}
                />
              </div>
              <div className={"inputpair"}>
                <label className="label" htmlFor="gameCategory">Game Category:</label>
                <select
                  id="gameCategory"
                  className="normalInput"
                  value={gameCategory}
                  onChange={e => setGameCategory(e.target.value)}
                >
                  <option value="STANDARDSONG">Normal</option>
                  <option value="STANDARDALBUMCOVER">Album Cover</option>
                </select>
              </div>
              <div className={"inputpair"}>
                <label className="label" htmlFor="playlist">Playlist:</label>
                <select
                  id="playlist"
                  className="normalInput"
                  value={playlist}
                  onChange={e => setPlaylist(e.target.value)}
                >
                  {availablePlaylists.map((playlist, index) => (
                    <option key={index} value={playlist.id}>{playlist.name}</option>
                  ))}
                </select>
              </div>
              <div className={"inputpair"}>
                <label className="label" htmlFor="streakStart">Streak Start:</label>
                <input
                  id="streakStart"
                  className="normalInput"
                  type="number"
                  placeholder="Streak Start"
                  value={streakStart}
                  onChange={e => setStreakStart(e.target.value)}
                />
              </div>
              <div className={"inputpair"}>
                <label className="label" htmlFor="streakMultiplier">Streak Multiplier:</label>
                <input
                  id="streakMultiplier"
                  className="normalInput"
                  type="number"
                  placeholder="Streak Multiplier"
                  value={streakMultiplier}
                  onChange={e => setStreakMultiplier(e.target.value)}
                />
              </div>
              <div className={"inputpair"}>
                <label className="label" htmlFor="timePerTurn">Time per Turn (Normal):</label>
                <input
                  id="timePerTurn"
                  className="normalInput"
                  type="number"
                  placeholder="Time per Turn Normal"
                  value={timePerTurn}
                  onChange={e => setTmePerTurn(e.target.value)}
                />
              </div>
              <div className={"inputpair"}>
                <label className="label" htmlFor="timePerTurnPowerUp">Time per Turn (Powerup):</label>
                <input
                  id="timePerTurnPowerUp"
                  className="normalInput"
                  type="number"
                  placeholder="Time per Turn Powerup"
                  value={timePerTurnPowerUp}
                  onChange={e => setTmePerTurnPowerUp(e.target.value)}
                />
              </div>
            </div>
            <div className="button-section">
              <hr />
              <div className={errorMessages ? "error-message-container" : "hidden"}>
                <div className="error-messages">
                  {errorMessages && <p>{errorMessages}</p>}
                </div>
              </div>
              <button
                type="submit"
                className="customizebtn"
                onClick={startGame}>Start Game
              </button>
              <button className="customizebtn" style={{"margin": "10px"}} onClick={cancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomizeGameParameter;
