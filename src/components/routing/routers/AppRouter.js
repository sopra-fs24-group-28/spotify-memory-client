import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../views/Login";
import AuthCallback from "../../views/AuthCallback";
import LobbyOverview from "../../views/LobbyOverview";
import CustomizeGameParameter from "../../views/CustomizeGameParameter";
import Navbar from "../../ui/Navbar";
import LobbyWaitingRoom from "../../views/LobbyWaitingRoom";
import GameScreen from "../../views/GameScreen";
import ProfilePage from "../../views/ProfilePage";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar height="100" />
      <Routes>

        <Route path="/game/*" element={<GameGuard />}>
          <Route path="/game/*" element={<GameRouter base="/game" />} />
        </Route>

        <Route path="/login" element={<LoginGuard />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/auth_callback" element={<AuthCallback />} />

        <Route path="/overview" element={<GameGuard />}>
          <Route path="/overview" element={<GameRouter base="/overview" />} />
        </Route>

        {/*just for testing*/}
        <Route path="" element={<GameGuard />}>
          <Route path="/lobbyOverview" element={<LobbyOverview />} />
          <Route path="/customizeGame" element={<CustomizeGameParameter />} />
          <Route path="/lobby/:gameid" element={<LobbyWaitingRoom />} />
          <Route path="/profilePage" element={<ProfilePage />} />
          <Route path="" element={<LoginGuard/>} /> 
        </Route>

        <Route path="/game/:gameid" element={<GameScreen />} />

        <Route path="/" element={
          <LoginGuard/>
        } />

      </Routes>
    </BrowserRouter>
  );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
