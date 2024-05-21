import React, { useEffect, useState } from "react";
import "styles/views/CustomizeGameParameter.scss";
import { api, handleError } from "helpers/api";
import GameParameter from "../../models/GameParameter";
import { useNavigate } from "react-router-dom";
import { getSpotifyPlaylist } from "../../helpers/spotifyrelated/getPlaylists";
import Lobby from "../../models/Lobby";
import LobbyDTO from "../../communication/websocket/dto/LobbyDTO";
import toastNotify from "../../helpers/Toast";
import "react-tooltip/dist/react-tooltip.css";


const CustomizeGameParameter = () => {
  const navigate = useNavigate();
  const [playerLimit, setPlayerLimit] = useState(2);
  const [numOfSets, setNumOfSets] = useState(5);
  const [numOfCardsPerSet, setNumOfCardsPerSet] = useState(2);
  const [gameCategory, setGameCategory] = useState("STANDARDALBUMCOVER");
  const [playlist, setPlaylist] = useState();
  const [streakStart, setStreakStart] = useState(2);
  const [streakMultiplier, setStreakMultiplier] = useState(3);
  const [timePerTurn, setTmePerTurn] = useState(15);
  const [gameParameters, setGameParameters] = useState();
  const [errorMessages, setErrorMessages] = useState<string>("");
  const [availablePlaylists, setAvailablePlaylists] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [startDisabled, setStartDisabled] = useState(false);
  const [playlistFetchCounter, setPlaylistFetchCounter] = useState(0);

  useEffect(() => {
    async function fetchAvailablePlaylists() {
      setPlaylistFetchCounter(playlistFetchCounter + 1);
      const playlists = await getSpotifyPlaylist();
      console.log("playlists", playlists);

      if (playlists === null || playlists.length === 0) {
        setStartDisabled(true)
      } else {
        setAvailablePlaylists(playlists);
      }
    }

    fetchAvailablePlaylists();
  }, []);

  useEffect(() => {
    if (availablePlaylists.length > 0) {
      setPlaylist(availablePlaylists[0].id);
    }
  }, [availablePlaylists]);

  const handleBlur = (value, setValue, min, max, def) => {
    if (value < min || value > max) {
      setValue(def);
    }
  };

  const validateInputs = () => {
    const validations: {
      check: () => boolean, errorMessage: string
    }[] = [{
      check: () => !playerLimit || playerLimit < 2,
      errorMessage: "Please enter a positive player limit greater than 1.",
    }, {
      check: () => !numOfSets || numOfSets <= 0, errorMessage: "Please enter a positive number of sets.",
    }, {
      check: () => !numOfCardsPerSet || numOfCardsPerSet <= 0,
      errorMessage: "Please enter a positive number of cards per set.",
    }, { check: () => !gameCategory, errorMessage: "Please select a gameCategory." }, {
      check: () => !playlist && playlistFetchCounter > 1, errorMessage: "Please select a playlist.",
    }, {
      check: () => !streakStart || streakStart <= 0,
      errorMessage: "Please select a positive number for the streak start.",
    }, {
      check: () => !streakMultiplier || streakMultiplier <= 1,
      errorMessage: "Please select a positive number greater than one for the streak multiplier.",
    }, {
      check: () => !timePerTurn || timePerTurn < 10 || timePerTurn > 60,
      errorMessage: "Please select a positive number between 10 and 60 seconds for normal turn time.",
    }];

    // Check each validation condition
    const invalidMessages = validations.filter(({ check }) => check()).map(({ errorMessage }) => errorMessage);
    const errorMessage = invalidMessages.join("\n").trim();
    if (errorMessage) {
      setErrorMessages(errorMessage);

      return;
    }
    setErrorMessages(errorMessage);
  };

  function startGame(e) {
    e.preventDefault();
    validateInputs();
    if (!startDisabled) {

      setGameParameters(new GameParameter({
        playerLimit: playerLimit,
        numOfSets: numOfSets,
        numOfCardsPerSet: numOfCardsPerSet,
        gameCategory: gameCategory,
        playlist: playlist,
        streakStart: streakStart,
        streakMultiplier: streakMultiplier,
        timePerTurn: timePerTurn,
      }));
    }
  }

  useEffect(() => {
    if (gameParameters) {
      sendLobbyCreationRequest();
    }
  }, [gameParameters]);

  useEffect(() => {
    if (errorMessages) {
      toastNotify(errorMessages, 5000, "warning");
    }
  }, [errorMessages]);

  useEffect(() => {
    validateInputs();
  }, [playerLimit, numOfSets, numOfCardsPerSet, gameCategory, playlist, streakStart, streakMultiplier, timePerTurn]);


  async function sendLobbyCreationRequest() {
    try {
      const requestBody = JSON.stringify(gameParameters);
      setStartDisabled(true);
      const response = await api.post("/games", requestBody);
      if (response.status === 201) {
        const returnedGameParameters = new GameParameter(response.data.gameParameters);
        const lobbyId = response.data.gameId;
        const lobbyDto = new LobbyDTO({ GameParameters: returnedGameParameters });
        const lobby = new Lobby(lobbyId, lobbyDto);
        navigate(`/lobby/${response.data.gameId}`, { state: { lobby: lobby } });
      } else {
        alert("Something went wrong setting up the lobby.");
      }
    } catch (error) {
      alert(`Something went wrong setting up the lobby. \n${handleError(error)}`);
    } finally {
      setStartDisabled(false);
    }
  }

  function cancel() {
    navigate("/lobbyoverview");
  }


  return (<>
      <div className="BaseContainer">
        <div className="BaseDiv">
          <div className="title-section">
            <h2 className="h2-title">Customize your Game!</h2>
          </div>
          <form className="input-section" onSubmit={startGame}>
            <div className="gridtop">
              <div className="inputpair" title="Specify the category of the game.">
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
              <div className="inputpair"
                   title="Choose any of your playlist. Choose one that surely has as many songs as your number of cards.">
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
              <div className="inputpair" title="Limit the amount of players that can join your lobby.">
                <label className="label" htmlFor="playerLimit">Player Limit:</label>
                <input
                  id="playerLimit"
                  className="normalInput"
                  value={playerLimit}
                  type="number"
                  onBlur={() => handleBlur(playerLimit, setPlayerLimit, 2,4,2)}
                  onChange={e => setPlayerLimit(Number(e.target.value))}
                />
              </div>
              <div className="inputpair"
                   title="The number of sets defines how many pairs, trios etc. will be in the game.">
                <label className="label" htmlFor="numOfSets">Number of Sets:</label>
                <input
                  id="numOfSets"
                  className="normalInput"
                  type="number"
                  value={numOfSets}
                  onBlur={() => handleBlur(numOfSets, setNumOfSets, 1,10,3)}
                  onChange={e => setNumOfSets(Number(e.target.value))}
                />
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault(); // Prevent form submission
                setShowAdvanced((prev) => !prev);
              }}
              className="customizebtn"
            >
              Advanced
            </button>
            {showAdvanced ?
              <div className="grid">
                <div className="inputpair" title="Adjust more specific parameters by pressing on this button.">
                  <label className="label" htmlFor="numOfCardsPerSet">Cards per Set:</label>
                  <input
                    id="numOfCardsPerSet"
                    className="normalInput"
                    type="number"
                    placeholder="Number of Cards per Set"
                    value={numOfCardsPerSet}
                    onBlur={() => handleBlur(numOfCardsPerSet, setNumOfCardsPerSet, 2,4,2)}
                    onChange={e => setNumOfCardsPerSet(Number(e.target.value))}
                  />
                </div>
                <div className="inputpair" title="Define after how many correct picks a streak starts">
                  <label className="label" htmlFor="streakStart">Streak Start:</label>
                  <input
                    id="streakStart"
                    className="normalInput"
                    type="number"
                    placeholder="Streak Start"
                    value={streakStart}
                    onBlur={() => handleBlur(streakStart, setStreakStart, 2,10,2)}
                    onChange={e => setStreakStart(Number(e.target.value))}
                  />
                </div>
                <div className="inputpair" title="Adjust the factor that points get multiplied during a streak.">
                  <label className="label" htmlFor="streakMultiplier">Streak Multiplier:</label>
                  <input
                    id="streakMultiplier"
                    className="normalInput"
                    type="number"
                    placeholder="Streak Multiplier"
                    value={streakMultiplier}
                    onBlur={() => handleBlur(streakMultiplier, setStreakMultiplier, 1,100,2)}
                    onChange={e => setStreakMultiplier(Number(e.target.value))}
                  />
                </div>
                <div className="inputpair" title="Adjust how many seconds the player has time to make a turn.">
                  <label className="label" htmlFor="timePerTurn">Time per Turn (Normal):</label>
                  <input
                    id="timePerTurn"
                    className="normalInput"
                    type="number"
                    placeholder="Time per Turn Normal"
                    value={timePerTurn}
                    onBlur={() => handleBlur(timePerTurn, setTmePerTurn, 10,60,15)}
                    onChange={e => setTmePerTurn(Number(e.target.value))}
                  />
                </div>
              </div> :
              <div></div>
            }
            <div className="button-section">
              <button
                type="submit"
                className="customizebtn"
                onClick={startGame}
                disabled={startDisabled}>
                Start Game
              </button>
              <button className="customizebtn" style={{ "margin": "10px" }} onClick={cancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomizeGameParameter;
