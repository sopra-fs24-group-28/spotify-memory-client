import React from "react";
import AppRouter from "./components/routing/routers/AppRouter";
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <AppRouter />
    </div>

  );
};

export default App;
