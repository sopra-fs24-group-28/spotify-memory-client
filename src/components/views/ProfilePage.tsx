import React, { useState, useEffect } from "react";
import "styles/views/ProfilePage.scss";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import ProfileCircle from "../ui/ProfileCircle";

const ProfiilePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Testuser");
  const [gamesPlayed, setGamesPlayed] = useState(10);
  const [gamesWon, setGamesWon] = useState(3);
  const [songsFound, setSongsFound] = useState(3);


  useEffect(() => {
    //Todo: reinladen der stats bei rendern der page.

  }, []);

  function doLogout() {
    //Todo: implement function that firstly validates the div and secondly sends the information to the backend
  }

  function doReturn() {
    navigate("/");
  }



  return (
  <div className="BaseContainer">
    <div className="BaseDiv">

      <div className="user-profile-header">
        <ProfileCircle height={70} width={70} />
        <h2 className="user-profile-name">{username}</h2>
      </div>
      <div className="user-profile-stats">
        <h3>User Statistic</h3>
        <div className="user-stats">
          <div className="stat-item">
            <span>Games Played</span>
            <span>{gamesPlayed}</span>
          </div>
          <div className="stat-item">
            <span>Games Won</span>
            <span>{gamesWon}</span>
          </div>
          <div className="stat-item">
            <span>Songs Found</span>
            <span>{songsFound}</span>
          </div>
        </div>
      </div>
      <div className="buttongroup">
        <div className="button-section">
          <Button
            width="100%"
            className="customizebtn"
            onClick={() => doLogout()}>Log out</Button>
        </div>

        <div className="button-section">
          <Button
            width="100%"
            className="customizebtn"
            onClick={() => doReturn()}>Return</Button>
        </div>
      </div>


    </div>
  </div>)

};
export default ProfiilePage;
