import "./App.css";
// import AddComponent from "./Components/AddComponent/AddComponent";

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
import NavBarS from "./Components/Nav/NavBarS";
import { Container } from "react-bootstrap";
import NavBarSMenu from "./Components/Nav/NavBarSMenu";

// import GoogleLoginB from "./Components/GoogleLoginButton/GoogleLoginB";
import GoogleLoginB2 from "./Components/GoogleLoginButton/GoogleLogInB2";

import { useProfile } from "./Components/GoogleLoginButton/profileContext";

function App() {
  const [isMinSize2, setIsMinSize2] = useState(true);
  const [viewAddTemplate, setViewAddTemplate] = useState(false);
  const [isBurgherClicked, setIsBurgherClicked] = useState(true);
  const [isTemplate, setIsTemlate] = useState(false);
  const [showPage, setShowPage] = useState(false);
  const { profile } = useProfile();

  console.log("Profile from App", profile);

  const handleResize2 = () => {
    if (window.innerWidth > 770) {
      setIsMinSize2(true);

      // console.log(window.innerWidth);
    } else if (window.innerWidth < 769) {
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

  const CloseTemplate = () => {
    setViewAddTemplate(false);
  };

  const isBurgherClickedEvent = (e) => {
    setIsBurgherClicked(e);
  };

  const ViewTemplate = () => {
    setIsTemlate(true);
  };
  console.log("isBurgherClicked", isBurgherClicked);

  const ShowPage = () => {
    setShowPage(!showPage);
  };
  console.log("showPage", showPage);

  return (
    <Container fluid>
      <Row>
        {/* <Col className="p-2  col-1  col-md-3 col-lg-2 col-xl-2">
          <Row className="sticky-top p-1 ">
            <NavBarS />
          </Row>
        </Col> */}
        {/* <Col className="col-0  col-md-2 col-lg-2 col-xl-2 p-2 sticky-top ">
          {isMinSize2 && <SideNav />}
        </Col> */}

        <GoogleLoginB2 ShowPage={ShowPage} />

        {showPage && (
          <Col className="p-2 ">
            <Row className="sticky-top p-1 ">
              <NaviBar
                isMinSize2={isMinSize2}
                // profile={profile}
                isBurgherClickedEvent={isBurgherClickedEvent}
              />
            </Row>

            <Row className="p-4 ">
              <Col className="p-0  col-1  col-md-1 col-lg-1 col-xl-1 ">
                <Row className="stickyside p-1 ">
                  {isMinSize2 && (
                    <NavBarSMenu isBurgherClicked={isBurgherClicked} />
                  )}
                </Row>
              </Col>
              <Col className="p-2  col-11  col-md-11 col-lg-11 col-xl-11">
                <Summary
                  NewTemplate={NewTemplate}
                  // databaseSummryFiltered={databaseSummryFiltered}
                />
                {viewAddTemplate && <Template CloseTemplate={CloseTemplate} />}
                <Database />
                {/* <AddComponent /> */}
                <Case />
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default App;
