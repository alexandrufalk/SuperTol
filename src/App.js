import "./App.css";
import AddComponent from "./Components/AddComponent/AddComponent";
import Case from "./Components/Case/Case";
import Database from "./Components/Database/Database";
import Summary from "./Components/Summary/Summary";
import Template from "./Components/Template/Template";
// import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState, useEffect } from "react";
import SideNav from "./Components/Nav/SideNav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NaviBar from "./Components/Nav/NaviBar";

function App() {
  const [isMinSize2, setIsMinSize2] = useState(true);
  const [viewAddTemplate, setViewAddTemplate] = useState(false);

  const handleResize2 = () => {
    if (window.innerWidth > 770) {
      setIsMinSize2(true);

      // console.log(window.innerWidth);
    } else {
      setIsMinSize2(false);
      // console.log(window.innerWidth);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize2);
  });

  const NewTemplate = (e) => {
    if (e === "New Template") {
      setViewAddTemplate(true);
    }
  };

  return (
    <>
      <Row>
        <Col className="col-0  col-md-3 col-lg-2 col-xl-2 p-2 sticky-top ">
          {isMinSize2 && <SideNav />}
        </Col>
        <Col className="col-12  col-md-9 col-lg-10 p-2 col-xl-10 ">
          <Row className="sticky-top p-4">
            <NaviBar isMinSize2={isMinSize2} />
          </Row>
          <Row className="p-4">
            <Summary NewTemplate={NewTemplate} />
            {viewAddTemplate && <Template />}
            <Database />
            <AddComponent />
            <Case />
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default App;
