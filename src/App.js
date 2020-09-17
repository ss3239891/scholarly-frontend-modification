import React from "react";
import { SignUpStudent } from "./components/signup/SignUpStudent";
import { Dashboard } from "./components/dashboard/Dashboard";

import "./App.css";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <SignUpStudent /> */}
        <Dashboard />
      </div>
    </BrowserRouter>
  );
}

export default App;
