import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import OpenSideNav from "./OpenSideNav";
import NaviBarS from "./NavBarS";
import "./Nav.css";
import Button from "react-bootstrap/Button";
import Figure from "react-bootstrap/Figure";
import Logo3 from "./Icons/Logo3.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useProfile } from "../GoogleLoginButton/profileContext";
import { googleLogout } from "@react-oauth/google";
import { Row } from "react-bootstrap";

const NaviBar = ({
  isMinSize2,
  isBurgherClickedEvent,
  ShowPage,
  setViewLogIn,
}) => {
  const { profile, setProfile } = useProfile();

  const logOut = () => {
    googleLogout();
    setProfile(null);
    ShowPage();
    setViewLogIn(true);
  };

  console.log("Profile from NaviBar", profile);
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
        <Container>
          <OpenSideNav />
          {isMinSize2 && (
            <div>
              <Navbar.Brand href="#home">SuperTol</Navbar.Brand>
              <Button
                className="position-absolute start-50 top-50 translate-middle iconbutton bg-transparent border-0"
                onClick={() => (window.location.href = "#home")}
              >
                <Figure
                  style={{ width: 120, height: 80 }}
                  className="position-absolute start-50 top-50 translate-middle "
                >
                  <Figure.Image
                    width={120}
                    height={80}
                    alt="85x90"
                    src={Logo3}
                    className="rounded"
                  />
                </Figure>
              </Button>
            </div>
          )}
          <Nav>
            <div className="d-flex align-items-end">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              {profile && (
                <>
                  <Navbar.Collapse className="justify-content-end">
                    {/* <Nav.Link href="#signin">SignIn as {profile.name}</Nav.Link> */}
                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title={`SignIn as ${profile.name}`}
                      menuVariant="dark"
                    >
                      <NavDropdown.Item href="#action/3.1" onClick={logOut}>
                        Log out
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Navbar.Collapse>
                  <Figure.Image
                    width={30}
                    height={20}
                    alt="60x40"
                    src={profile.picture}
                    className="rounded"
                  />
                </>
              )}
            </div>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NaviBar;
