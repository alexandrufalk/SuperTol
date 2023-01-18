import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import OpenSideNav from "./OpenSideNav";

const NaviBar = () => {
  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        className="rounded shadow-lg  p-2 bg-body-tertiary rounded  "
      >
        <Container className="ms-1">
          <OpenSideNav />
          <Navbar.Brand href="#home">SuperTol</Navbar.Brand>
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
