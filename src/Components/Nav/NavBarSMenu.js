import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Row, Container } from "react-bootstrap";
import Figure from "react-bootstrap/Figure";
import "./NavBarS.css";
import DatabaseImg from "./Icons/DatabaseImg.png";
import SummaryImg from "./Icons/SummaryImg.png";
import TemplateImg from "./Icons/TemplateImg.png";
import AddImg from "./Icons/AddImg.png";
import PDFImg from "./Icons/PDFImg.png";

const NavBarSMenu = ({ isBurgherClicked, ViewAddTemplate, ViewDatabase }) => {
  // to change burger classes
  //   const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  //   const [menu_class, setMenuClass] = useState("menu hidden");
  //   const [isMenuClicked, setIsMenuClicked] = useState(false);

  // toggle burger menu change
  //   const updateMenu = () => {
  //     if (!isMenuClicked) {
  //       setBurgerClass("burger-bar clicked");
  //       setMenuClass("menu isBurgherClicked");
  //     } else {
  //       setBurgerClass("burger-bar unclicked");
  //       setMenuClass("menu hidden");
  //     }
  //     // setIsMenuClicked(!isMenuClicked);
  //   };
  const scrollToSummary = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Smooth scrolling animation
    });
  };

  console.log("NavBarSMenu isBurgherClicked:", isBurgherClicked);

  return (
    <div>
      {/* //   <Row className="bnav rounded-5 ">
    //     <div className="burger-menu" onClick={updateMenu}>
    //       <div className={burger_class}></div>
    //       <div className={burger_class}></div>
    //       <div className={burger_class}></div>
    //     </div>
    //   </Row> */}
      <Row className="stickyside">
        {isBurgherClicked && (
          <div className="sidecompresed ">
            <Button
              variant="info"
              className="sidebutonscompresed button1 shadow-lg"
              onClick={scrollToSummary}
            >
              <Figure style={{ width: 30, height: 15 }}>
                <Figure.Image
                  width={30}
                  height={15}
                  alt="Summary"
                  src={SummaryImg}
                  className="rounded"
                />
              </Figure>
            </Button>
            <Button
              variant="success"
              className="sidebutonscompresed button1 shadow-lg"
              onClick={ViewAddTemplate}
            >
              <Figure style={{ width: 30, height: 15 }}>
                <Figure.Image
                  width={30}
                  height={15}
                  alt="Template"
                  src={TemplateImg}
                  className="rounded"
                />
              </Figure>
            </Button>
            <Button
              variant="primary"
              className="sidebutonscompresed button1 shadow-lg"
              onClick={ViewDatabase}
            >
              <Figure style={{ width: 30, height: 15 }}>
                <Figure.Image
                  width={30}
                  height={15}
                  alt="Database"
                  src={DatabaseImg}
                  className="rounded"
                />
              </Figure>
            </Button>
            <Button
              variant="success"
              className="sidebutonscompresed button1 shadow-lg"
            >
              <Figure style={{ width: 30, height: 15 }}>
                <Figure.Image
                  width={30}
                  height={15}
                  alt="AddCase"
                  src={AddImg}
                  className="rounded"
                />
              </Figure>
            </Button>
            <Button
              variant="danger"
              className="sidebutonscompresed button1 shadow-lg"
            >
              <Figure style={{ width: 30, height: 15 }}>
                <Figure.Image
                  width={30}
                  height={15}
                  alt="PDF"
                  src={PDFImg}
                  className="rounded"
                />
              </Figure>
            </Button>
          </div>
        )}
        {!isBurgherClicked && (
          <div>
            <div>
              <Button
                variant="info"
                className="sidebutonscompresed button1"
                onClick={scrollToSummary}
              >
                Summary
              </Button>
              <Button
                variant="success"
                className="sidebutonscompresed button1"
                onClick={ViewAddTemplate}
              >
                Template
              </Button>
              <Button
                variant="primary"
                className="sidebutonscompresed button1"
                onClick={ViewDatabase}
              >
                Database
              </Button>
              <Button variant="success" className="sidebutonscompresed button1">
                Add Case
              </Button>
              <Button variant="danger" className="sidebutonscompresed button1">
                PDF Gen.
              </Button>
            </div>
          </div>
        )}
      </Row>
    </div>
  );
};

export default NavBarSMenu;
