import React from "react";
import "../../styles/ui/Navbar.scss";
import GameIconSVG from "./icons-svg/GameIconSVG";
import LogoutSVG from "./icons-svg/LogoutSVG";
import MuteSVG from "./icons-svg/MuteSVG";
import PreferencesSVG from "./icons-svg/PreferencesSVG";



const Navbar = () => {
  return (<nav className="navbar">
    <div className="navbar-container">
      <span href="/" className="navbar-brand">
        Spotymemory
      </span>
      <div className="navbar-icons">

        <a href="/lobbyOverview"  className="iconItems">
          <GameIconSVG></GameIconSVG>
        </a>
        <a href="/login"  className="iconItems">
          <LogoutSVG />
        </a>
        <a href="/"  className="iconItems">
          <MuteSVG />
        </a>
        <a href="/profilePage" className="iconItems">
          <PreferencesSVG width={50} height={50}></PreferencesSVG>
        </a>

        {/*<div className="iconItems">*/}
        {/*  <HomeSVG />*/}
        {/*</div>*/}


      </div>
    </div>
  </nav>);
};
export default Navbar;
