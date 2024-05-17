import React from "react";
import { Button } from "components/ui/Button";
import PropTypes from "prop-types";
import "../../styles/ui/InfoBox.scss";

const InfoBox = (props) => {
  let closeFunc = props?.closeFunc

  return (
    <div className="info-box main-box">
      <div className="info-box overlay"></div> {/* Transparent overlay */}
      <div className="button-container-exit">
        <button onClick={() => {closeFunc()}} className="exit-button">✕</button>
      </div>
      <div className="column">
          <h2>Rules of the Game</h2>
          <p>In this twist to the classical boardgame memory, players select one of their Spotify playlists to be the content of a deck of cards.</p>
          <p>
            In turns, each player chooses two cards and turns them face up. If they match, then that player wins the pair and plays again. 
            If they do not match, they are turned face down again and play passes to the next player.
            The game ends when the last pair has been picked up. The winner is the player with the most pairs. 
          </p>
          <div className="button-container-wiki">
            <Button className="info-wiki-button" width="50%" onClick={() => {window.open("https://en.wikipedia.org/wiki/Concentration_(card_game)")}}>More on Wikipedia</Button>
          </div>
      </div>
      <div className="column">
          <h2>Hints for Smooth Gameplay</h2>
          <p>The target browser for this app is a recent version of Google Chrome.</p>
          <p>Furthermore, due to the Spotify APIs used to facillitate gameplay, we have found that some settings may prevent a smooth experience. If you are having trouble playing the game, please ensure that you:</p>
          <ol>
            <li className="list">Disable VPN</li>
            <li className="list">Disable Ad Blockers</li>
            <li className="list">Allow Popups</li>
            <li className="list">Disable Tracking Preventions</li>
            <li className="list">Select Playlist available in local markets</li>
          </ol>
      </div>
    </div>
  );

};

InfoBox.propTypes = {
  closeFunc: PropTypes.func, 
};


export default InfoBox;
