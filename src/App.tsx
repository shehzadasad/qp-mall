import React from "react";
import { Toaster } from "react-hot-toast";
import MyRouter from "routers/index";

import "./App.css";
function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="bg-white text-base dark:bg-slate-900 text-slate-900 dark:text-slate-200">
        <MyRouter />
      </div>
    </>
  );
}

export default App;
