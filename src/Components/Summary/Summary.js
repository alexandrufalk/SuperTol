import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Figure from "react-bootstrap/Figure";
// import Logo from "./Logo.png";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState, useEffect } from "react";
import SideNav from "../SideNav/SideNav";

function OpenSideNav() {
  const [show, setShow] = useState(false);
  const [isMinSize, setIsMinSize] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleResize = () => {
    if (window.innerWidth < 770) {
      setIsMinSize(true);
      setShow(true);
      // console.log(window.innerWidth);
    } else {
      setIsMinSize(false);
      setShow(false);

      // console.log(window.innerWidth);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  // finally you can render components conditionally if  is True or False
  console.log(isMinSize);

  return (
    <>
      {isMinSize && (
        <Button variant="primary" onClick={handleShow}>
          NavBar
        </Button>
      )}

      <Offcanvas
        show={show}
        onHide={handleClose}
        className="justify-content-md-center shadow p-3 mb-5 bg-body-tertiary rounded w-auto bg-dark p-2 text-dark bg-opacity-75"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-end text-info">
            SuperTol Nav
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SideNav />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function Summary() {
  const [isMinSize2, setIsMinSize2] = useState(true);
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
  return (
    <>
      <Row>
        {isMinSize2 && <SideNav />}
        <Col className="p-2 ">
          <Navbar
            bg="light"
            variant="light"
            className="rounded shadow-lg mb-5 bg-body-tertiary rounded opacity-75"
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
          <Form className="p-2">
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter project name" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Project Template</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter project template name"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="secondary" type="submit">
              Save
            </Button>
          </Form>
          <Container className="p-3">
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Description</th>
                  <th>Sheet name</th>
                  <th>Author</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Case1</td>
                  <td>Gap housing-cover</td>
                  <td>Alex</td>
                  <td>data</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Case2</td>
                  <td>Gap housing-connector</td>
                  <td>Alex</td>
                  <td>data</td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default Summary;
