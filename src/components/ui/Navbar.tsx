import React, { useState } from "react";
import "../../styles/ui/Navbar.scss";
import GameIconSVG from "./icons-svg/GameIconSVG";
import LogoutSVG from "./icons-svg/LogoutSVG";
import InfoBox from "./InfoBox";
import { logout } from "../../helpers/auth/logoutfunction";
import { useLocation, useNavigate } from "react-router-dom";
import toastNotify from "../../helpers/Toast";
import UserProfileSVG from "./icons-svg/UserProfileSVG";

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [infoContent, setInfoContent] = useState(<div></div>);


  //conditional rendering over
  const isProfilePage = location.pathname.toLowerCase() === "/profilepage";
  const isLobbyOverviewPage = location.pathname.toLowerCase() === "/lobbyoverview";
  const isLoginPage = location.pathname.toLowerCase() === "/login";
  const isGamePage = location.pathname.toLowerCase().includes("game") //|| location.pathname.toLowerCase().includes("");
  const isLobbyPage = location.pathname.toLowerCase().includes("lobby")

  const handleLogout = () => {
    logout(navigate).then( () =>{toastNotify("successfully logged out", 500, "normal")})
  };

  const showInfo = () => {
    setInfoContent(<InfoBox closeFunc={closeInfo}/>);   
  }

  const closeInfo = () => {    
    setInfoContent(<div></div>);    
  }


  return (
    <div>
    <nav className="navbar">
      <div className="navbar-container">
        {(isLoginPage || isGamePage) ?
        <a className="navbar-brand">
          Spotymemory
        </a>
        :
        <p className="navbar-brand">
          Spotymemory
        </p>
  }

        <div className="navbar-icons">
          {!(isGamePage || isLoginPage || isLobbyPage && !isLobbyOverviewPage) && (
            <a onClick={showInfo} className="iconItems" title="Information">
              <GameIconSVG></GameIconSVG>
            </a>)}
          {!(isGamePage || isLoginPage || isLobbyPage && !isLobbyOverviewPage) && (
            <a href="/lobbyoverview" className="iconItems" title="Return to the Lobby Overview">
              <GameIconSVG></GameIconSVG>
            </a>)}
          {!(isGamePage || isLoginPage || isLobbyPage && !isLobbyOverviewPage) && (
            <a onClick={handleLogout} className="iconItems" title="Log out!">
              <LogoutSVG />
            </a>)}

          {!(isGamePage || isLoginPage || isLobbyPage && !isLobbyOverviewPage) && (
            <a href="/profilePage" className="iconItems" title="Check out your Profile Page!">
              <UserProfileSVG/>
            </a>)}
        </div>
        </div>
    </nav>
    {infoContent}
    </div>
  );
};

export default Navbar;
