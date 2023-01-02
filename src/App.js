import "./App.css";
import AddComponent from "./Components/AddComponent/AddComponent";
import Case from "./Components/Case/Case";
import Database from "./Components/Database/Database";
import Summary from "./Components/Summary/Summary";
import Template from "./Components/Template/Template";
// import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import Offcanvas from "react-bootstrap/Offcanvas";

function App() {
  return (
    <>
      <Summary />
      <Template />
      <Database />
      <AddComponent />
      <Case />
    </>
  );
}

export default App;
