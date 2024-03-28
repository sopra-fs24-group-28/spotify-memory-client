import React, { useState } from "react";
import "styles/views/CustomizeGameParameter.scss";
import { api, handleError } from "helpers/api";
import GameParameter from "../../models/GameParameter";
import { useNavigate } from "react-router-dom";


const CustomizeGameParameter = () => {
  const navigate = useNavigate();
  const [playerLimit, setPlayerLimit] = useState(4);
  const [numberOfSets, setNumberOfSets] = useState(1);
  const [numberOfCardsPerSet, setNumberOfCardsPerSet] = useState(2);
  const [category, setCategory] = useState("");
  const [playlist, setPlaylist] = useState("");
  const [streakStart, setStreakStart] = useState(3);
  const [streakMultiplier, setStreakMultiplier] = useState(2);
  const [timePerTurnNormal, setTimePerTurnNormal] = useState(10);
  const [timePerTurnPowerup, setTimePerTurnPowerup] = useState(5);
  const [gameParameters, setGameParameters] = useState();

  function startGame(e) {
    e.preventDefault();
    //form validation:
    if (!playerLimit || playerLimit <= 0) {
      alert("Please enter a positive player limit.");
      return;
    }
    if (!numberOfSets || numberOfSets <= 0) {
      alert("Please enter a positive number of sets.");
      return;
    }
    if (!numberOfCardsPerSet || numberOfCardsPerSet <= 0) {
      alert("Please enter a positive number of cards per set.");
      return;
    }
    if (!category) {
      alert("Please select a category.");
      return;
    }
    if (!playlist) {
      alert("Please select a playlist.");
      return;
    }
    if (!streakStart || streakStart <= 0) {
      alert("Please select a positive number for the streak start.");
      return;
    }
    if (!streakMultiplier || streakMultiplier <= 1) {
      alert("Please select a positive number greater than on for the streak multiplier.");
      return;
    }

    if (!timePerTurnNormal || timePerTurnNormal < 10 || timePerTurnNormal > 60) {
      alert("Please select a positive number between 10 and 60 seconds.");
      return;
    }

    if (!timePerTurnPowerup || timePerTurnPowerup < 10 || timePerTurnPowerup > 60) {
      alert("Please select a positive number between 10 and 60 seconds.");
      return;
    }


    setGameParameters(new GameParameter({
      playerLimit: playerLimit,
      numberOfSets: numberOfSets,
      numberOfCardsPerSet: numberOfCardsPerSet,
      category: category,
      playlist: playlist,
      streakStart: streakStart,
      streakMultiplier: streakMultiplier,
      timePerTurnNormal: timePerTurnNormal,
      timePerTurnPowerup: timePerTurnPowerup,
    }));

    sendApiRequest();

  }


// @ts-ignore
  async function sendApiRequest() {
    try {
      //api call to send parameters
      //TODO: check token with Backend Guys and adjust them accordingly
      // const headers: { Authorization: string } = {
      //   "Authorization": `Bearer ${localStorage.getItem("token")}`,
      // };

      const requestBody = JSON.stringify(gameParameters);
      const response = await api.post("/game", requestBody);


      if (response.status === 200) {
        setGameParameters(new GameParameter(response.data));
        // console.log(gameParameters);
        //navigate(`game/${gameParameters.gameId}`); //TODO: uncomment when backend is ready
      } else {
        alert("Something went wrong setting up the lobby.");
      }
    } catch (error) {
      alert(`Something went wrong setting up the lobby. \n${handleError(error)}`);
    }

  }


  return (<>
    <div className="BaseContainer">
      <div className="BaseDiv">
        <div className="title-section">
          <h2 className="h2-title">Customize your Game!</h2>
        </div>
        <form className="input-section" onSubmit={startGame}>
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
            <label className="label" htmlFor="numberOfSets">Number of Sets:</label>
            <input
              id="numberOfSets"
              className="normalInput"
              type="number"

              value={numberOfSets}
              onChange={e => setNumberOfSets(e.target.value)}
            />
          </div>
          <div className={"inputpair"}>
            <label className="label" htmlFor="numberOfCardsPerSet">Cards per Set:</label>
            <input
              id="numberOfCardsPerSet"
              className="normalInput"
              type="number"
              placeholder="Number of Cards per Set"
              value={numberOfCardsPerSet}
              onChange={e => setNumberOfCardsPerSet(e.target.value)}
            />
          </div>
          <div className={"inputpair"}>
            <label className="label" htmlFor="category">Category:</label>
            <select
              id="category"
              className="normalInput"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="Normal">Normal</option>
              <option value="Advanced">Advanced</option>
              <option value="Speed">Speed</option>
            </select>
          </div>
          <div className={"inputpair"}>
            <label className="label" htmlFor="playlist">Playlist:</label>
            <input
              id="playlist"
              className="normalInput"
              placeholder="Playlist"
              value={playlist}
              onChange={e => setPlaylist(e.target.value)}
            />
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
            <label className="label" htmlFor="timePerTurnNormal">Time per Turn (Normal):</label>
            <input
              id="timePerTurnNormal"
              className="normalInput"
              type="number"
              placeholder="Time per Turn Normal"
              value={timePerTurnNormal}
              onChange={e => setTimePerTurnNormal(e.target.value)}
            />
          </div>
          <div className={"inputpair"}>
            <label className="label" htmlFor="timePerTurnPowerup">Time per Turn (Powerup):</label>
            <input
              id="timePerTurnPowerup"
              className="normalInput"
              type="number"
              placeholder="Time per Turn Powerup"
              value={timePerTurnPowerup}
              onChange={e => setTimePerTurnPowerup(e.target.value)}
            />
          </div>
          <div className="button-section">
            <hr />
            <button
              type="submit"
              className="customizebtn"
              onClick={startGame}>Start Game
            </button>
          </div>
        </form>
      </div>
    </div>
  </>);
};

export default CustomizeGameParameter;
