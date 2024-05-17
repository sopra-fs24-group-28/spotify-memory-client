import React, { useEffect, useState } from "react";
import "styles/views/ProfilePage.scss";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import ProfileCircle from "../ui/ProfileCircle";
import { logout } from "../../helpers/auth/logoutfunction";
import toastNotify from "../../helpers/Toast";
import { api } from "helpers/api";
import UserInformation from "../../models/UserInformation";


const ProfiilePage = () => {
  const navigate = useNavigate();
  const [userInformation, setUserInformation] = useState(new UserInformation());

  useEffect(() => {
    async function getUserInformation() {
      try {
        const response = await api.get("/users/profiles");
        if (response.status === 200) {
          setUserInformation(new UserInformation(response.data));
        }
      } catch (error) {
        toastNotify("There was an error loading the information of the current user. Please reload the page.", 2000, "warning");
      }
    }

    getUserInformation();
  }, []);


  function doLogout() {
    logout(navigate);
  }

  function doReturn() {
    navigate("/lobbyOverview");
  }


  return (
    <div className="BaseContainer">
      <div className="BaseDiv">

        <div className="user-profile-header">
          <ProfileCircle height={"140px"} width={"140px"} url={userInformation.profileImageUrl} />
          <h2 className="user-profile-name">{userInformation.username}</h2>
        </div>
        <div className="user-profile-stats">
          <h3>User Statistic</h3>
          <div className="user-stats">
            <div className="stat-item">
              <span>Games Played</span>
              <span>{userInformation.totalGames}</span>
            </div>
            <div className="stat-item">
              <span>Games Won</span>
              <span>{userInformation.gamesWon}</span>
            </div>
            <div className="stat-item">
              <span>Games Aborted</span>
              <span>{userInformation.gamesAborted}</span>
            </div>
            <div className="stat-item">
              <span>Total Points Won</span>
              <span>{userInformation.setsWon}</span>
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
    </div>);

};

export default ProfiilePage;

