import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Game from "../../views/Game";
//import Overview from "../../views/Overview"; // double check if this is the correct view Component
import PropTypes from "prop-types";

const GameRouter = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Routes>

        <Route path="" element={<Game />} />

        <Route path="dashboard" element={<Game />} />

        <Route path="*" element={<Navigate to="dashboard" replace />} />

        {//<Route path="overview" element={<Overview />} />
        }

      </Routes>

    </div>
  );
};
/*
* Don't forget to export your component!
 */

GameRouter.propTypes = {
  base: PropTypes.string,
};

export default GameRouter;
