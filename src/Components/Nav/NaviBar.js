import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import OpenSideNav from "./OpenSideNav";
import NaviBarS from "./NavBarS";

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
          {isMinSize2 && <Navbar.Brand href="#home">SuperTol</Navbar.Brand>}
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
