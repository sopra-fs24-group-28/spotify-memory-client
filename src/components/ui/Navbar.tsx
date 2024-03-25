import React from "react";
import "../../styles/ui/Navbar.scss";
import GameIconSVG from "../../styles/iconpaths/GameIconSVG";
import PreferencesSVG from "../../styles/iconpaths/PreferencesSVG";
import MuteSVG from "../../styles/iconpaths/MuteSVG";
import LogoutSVG from "../../styles/iconpaths/LogoutSVG";
import HomeSVG from "../../styles/iconpaths/HomeSVG";


const Navbar = () => {
  return (<nav className="navbar">
    <div className="navbar-container">
      <a href="/" className="navbar-brand">
        Spotymemory
      </a>
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
