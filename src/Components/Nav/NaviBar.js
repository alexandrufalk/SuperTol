import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import OpenSideNav from "./OpenSideNav";
import NaviBarS from "./NavBarS";
import Logo from "./Logo.png";
import Button from "react-bootstrap/Button";
import Figure from "react-bootstrap/Figure";

const NaviBar = ({ isMinSize2, isBurgherClickedEvent }) => {
  console.log("isMinSize2 for NaviBar", isMinSize2);
  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        className="rounded-5 shadow-lg  p-2 bg-body-tertiary  "
      >
        {isMinSize2 && (
          <NaviBarS isBurgherClickedEvent={isBurgherClickedEvent} />
        )}
        <Container className="ms-1">
          <OpenSideNav />
          {isMinSize2 && (
            <div>
              <Navbar.Brand href="#home">SuperTol</Navbar.Brand>
              <Button
                variant="info"
                className="position-absolute start-50 top-50 translate-middle"
              >
                <Figure
                  style={{ width: 47, height: "auto" }}
                  className="position-absolute start-50 top-50 translate-middle"
                >
                  <Figure.Image
                    width={85}
                    height={45}
                    alt="85x90"
                    src={Logo}
                    className="rounded"
                  />
                </Figure>
              </Button>
            </div>
          )}
          <Nav>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Navbar.Collapse className="justify-content-end">
              <Nav.Link href="#signin">SignIn</Nav.Link>
            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NaviBar;
