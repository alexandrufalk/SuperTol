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

const NavBarS = ({ isBurgherClickedEvent }) => {
  // to change burger classes
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  // toggle burger menu change
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
    isBurgherClickedEvent(isMenuClicked);
  };

  return (
    <div className="maxwidthside">
      <Row className="bnav rounded-5 ">
        <div className="burger-menu" onClick={updateMenu}>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
        </div>
      </Row>

      {/* {!isMenuClicked && (
        <div className="sidecompresed p-2">
          <Button variant="info" className="sidebutonscompresed">
            <Figure style={{ width: 40, height: 20 }}>
              <Figure.Image
                width={40}
                height={20}
                alt="Summary"
                src={SummaryImg}
                className="rounded"
              />
            </Figure>
          </Button>
          <Button variant="success" className="sidebutonscompresed">
            <Figure style={{ width: 40, height: 20 }}>
              <Figure.Image
                width={40}
                height={20}
                alt="Template"
                src={TemplateImg}
                className="rounded"
              />
            </Figure>
          </Button>
          <Button variant="primary" className="sidebutonscompresed">
            <Figure style={{ width: 40, height: 20 }}>
              <Figure.Image
                width={40}
                height={20}
                alt="Database"
                src={DatabaseImg}
                className="rounded"
              />
            </Figure>
          </Button>
          <Button variant="success" className="sidebutonscompresed">
            <Figure style={{ width: 40, height: 20 }}>
              <Figure.Image
                width={40}
                height={20}
                alt="AddCase"
                src={AddImg}
                className="rounded"
              />
            </Figure>
          </Button>
          <Button variant="danger" className="sidebutonscompresed">
            <Figure style={{ width: 40, height: 20 }}>
              <Figure.Image
                width={40}
                height={20}
                alt="PDF"
                src={PDFImg}
                className="rounded"
              />
            </Figure>
          </Button>
        </div>
      )}
      <div className={menu_class}>
        <div>
          <Button variant="info" className="sidebutonscompresed">
            Summary
          </Button>
          <Button variant="success" className="sidebutonscompresed">
            Template
          </Button>
          <Button variant="primary" className="sidebutonscompresed">
            Database
          </Button>
          <Button variant="success" className="sidebutonscompresed">
            Add Case
          </Button>
          <Button variant="info" className="sidebutonscompresed">
            PDF Gen.
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default NavBarS;
