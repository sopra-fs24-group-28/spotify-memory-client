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


/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reactrouter.com/en/main/start/tutorial
 */
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
        <Route path="/lobbyOverview" element={<LobbyOverview />} />
        <Route path="/customizeGame" element={<CustomizeGameParameter />} />
        <Route path="/lobby" element={<LobbyWaitingRoom />} />


        <Route path="/" element={
          <Navigate to="/login" replace />
        } />

      </Routes>
    </BrowserRouter>
  );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
