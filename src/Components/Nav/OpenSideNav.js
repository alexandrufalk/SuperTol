import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import SideNav from "../Nav/SideNav";

const OpenSideNav = () => {
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

  // finally you can render components conditionally if  is True or False ()
  console.log(isMinSize);

  return (
    <>
      {isMinSize && (
        <Button variant="primary" onClick={handleShow}>
          SideBar
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
};

export default OpenSideNav;
