import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Figure from "react-bootstrap/Figure";
import Nav from "react-bootstrap/Nav";
import Logo from "./Logo.png";

const SideNav = () => {
  return (
    <>
      <Col
        md="auto"
        className=" shadow-lg p-1 mb-5 bg-body-tertiary rounded opacity-85 sticky"
      >
        <Figure style={{ width: 47, height: "auto" }}>
          <Figure.Image
            width={85}
            height={45}
            alt="85x90"
            src={Logo}
            className="rounded"
          />
        </Figure>
        <Nav defaultActiveKey="/home" className="flex-column  gap-4 fs-5">
          <Button variant="success">Template</Button>{" "}
          <Button variant="primary">Database</Button>{" "}
          <Button variant="secondary">Edit Case Sheet</Button>{" "}
          <Button variant="danger">Delete Case</Button>{" "}
          <Button variant="success">Add Case</Button>{" "}
          <Button variant="info">Generate report(pdf)</Button>{" "}
        </Nav>
      </Col>
    </>
  );
};

export default SideNav;
