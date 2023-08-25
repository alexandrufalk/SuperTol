import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { GoogleLoginButton } from "react-social-login-buttons";
import axios from "axios";
import Figure from "react-bootstrap/Figure";
import Logo3 from "../Nav/Icons/Logo3.png";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useProfile } from "./profileContext";

function GoogleLoginB2({ ShowPage }) {
  const [user, setUser] = useState([]);
  //   const [profile, setProfile] = useState(null);
  const { profile, setProfile } = useProfile(null);

  console.log("Profile from GoogleLogIn", profile);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      ShowPage(); // Set showPage to true when login is successful
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
    ShowPage();
  };

  return (
    <Container className="text-center">
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <>
          <Row style={{ alignItems: "center", marginTop: "100px" }}>
            <h2 className="text-light">SuperTol Login</h2>
          </Row>

          <Row style={{ alignItems: "center", marginTop: "40px" }}>
            <Col sm={3}></Col>
            <Col sm={3}>
              <Figure.Image
                width={360}
                height={240}
                alt="85x90"
                src={Logo3}
                className="rounded"
                style={{ display: "block", margin: "0 auto" }}
              />
            </Col>
            <Col sm={2} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ margin: "0 auto" }}>
                {/* <Button>Google</Button> */}
                <GoogleLoginButton onClick={() => login()} />

                {/* <button onClick={() => login()}>Sign in with Google 🚀 </button> */}
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
export default GoogleLoginB2;
