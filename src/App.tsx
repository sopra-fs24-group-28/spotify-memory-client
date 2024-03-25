import React from "react";
import AppRouter from "./components/routing/routers/AppRouter";
import Navbar from "./components/ui/Navbar";

const App = () => {
  return (
    <div>
      <Navbar height="100" />
      <AppRouter />
    </div>
  );
};

export default App;
