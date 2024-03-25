import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { ButtonSVG } from "../ui/ButtonwithSVG";
import GameIconSVG from "../../styles/iconpaths/GameIconSVG";
import SpotifyLogo from "../../styles/iconpaths/SpotifyLogo";
import SpotifyLogoWithTextSVG from "../../styles/iconpaths/SpotifyLogoWithTextSVG";



const Login = () => {
  const navigate = useNavigate();


  const doLogin = async () => {
    //Todo: make call to spotify API to get redirected to their login.
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          <div className="h2-title">Login with your Spotify Credentials</div>
          <div className= "logoContainer"><SpotifyLogoWithTextSVG width="100" height= "100"></SpotifyLogoWithTextSVG></div>

          <div className="login button-container">
            <Button
              width="50%"
              className= "spotifyButton"
              onClick={() => doLogin()}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Login;
