import React from "react";
import "../../styles/ui/Navbar.scss";
import GameIconSVG from "./icons-svg/GameIconSVG";
import LogoutSVG from "./icons-svg/LogoutSVG";
import MuteSVG from "./icons-svg/MuteSVG";
import PreferencesSVG from "./icons-svg/PreferencesSVG";
import { logout } from "../../helpers/auth/logoutfunction";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  //conditional rendering over
  const isProfilePage = location.pathname.toLowerCase() === "/profilepage";
  const isLobbyOverviewPage = location.pathname.toLowerCase() === "/lobbyoverview";
  const isLoginPage = location.pathname.toLowerCase() === "/login";
  const isGamePage = /^\/games\/game\/\d+$/.test(location.pathname.toLowerCase());


  const handleLogout = () => {
    console.log(isLoginPage);
    logout(navigate);
  };

  return (<nav className="navbar">
    <div className="navbar-container">
      <a href={(isLoginPage || isGamePage) ? "None" : "/"} className="navbar-brand">
        Spotymemory
      </a>

      <div className="navbar-icons">
        {!(isGamePage || isLoginPage) && (
          <a href="/lobbyoverview" className="iconItems">
            <GameIconSVG></GameIconSVG>
          </a>)}
        {!(isGamePage || isLoginPage) && (
          <a onClick={handleLogout} className="iconItems">
            <LogoutSVG />
          </a>)}
        <a href="/" className="iconItems">
          <MuteSVG />
        </a>
        {!(isGamePage || isLoginPage) && (
          <a href="/profilePage" className="iconItems">
            <PreferencesSVG width={50} height={50}></PreferencesSVG>
          </a>)}
        {/*<div className="iconItems">*/}
        {/*  <HomeSVG />*/}
        {/*</div>*/}
      </div>
    </div>
  </nav>);
};

export default Navbar;
