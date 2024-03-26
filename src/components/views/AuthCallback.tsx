import React, { useEffect } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import {useNavigate, useSearchParams} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  

  useEffect(() => {
    async function auth_user() {
      try {
        const requestBody = JSON.stringify({ code });
        const response = await api.get('/auth/token', requestBody);
        
        // Store the token into the local storage.
        // assuming response already 200, otherwise would have been caught by handleError
        localStorage.setItem("token", response.data);
        navigate("/overview");
         
        // Login successfully worked --> navigate to the route /game in the GameRouter
      } catch (error) {
        console.log(handleError(error));
        navigate("/login");
      }
    }
    auth_user();
    }, [] );
  


  return ( <BaseContainer>
      <div className="login container">
        <div className="login form">
          <div className="login button-container">
              Redirecting ...
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default AuthCallback;
