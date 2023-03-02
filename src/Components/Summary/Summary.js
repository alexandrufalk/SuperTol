import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Figure from "react-bootstrap/Figure";
// import Logo from "./Logo.png";

function Summary() {
  const DatabaseSummry = [
    {
      ID: 1,
      Description: "Case1",
      SheetName: "Gap housing-cover",
      Author: "Alex",
      Date: "Data",
    },
    {
      ID: 2,
      Description: "Case2",
      SheetName: "Gap housing-PCB",
      Author: "Alex",
      Date: "Data",
    },
    {
      ID: 3,
      Description: "Case3",
      SheetName: "Gap PCB-cover",
      Author: "Alex",
      Date: "Data",
    },
  ];

  return (
    <>
      <Row>
        <Col className="p-2">
          <Form className="p-2">
            <Row>
              <Col>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
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
                {DatabaseSummry.map((n) => (
                  <tr key={n.ID}>
                    <td key={n.ID}> {n.ID}</td>
                    <td key={n.ID + n.Description}> {n.Description}</td>
                    <td key={n.ID + n.SheetName}> {n.SheetName}</td>
                    <td key={n.ID + n.Author}> {n.Author}</td>
                    <td key={n.ID + n.Date}> {n.Date}</td>
                  </tr>
                ))}
                {/* <tr>
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
                </tr> */}
              </tbody>
            </Table>
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default Summary;
