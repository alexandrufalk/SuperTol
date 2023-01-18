import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Figure from "react-bootstrap/Figure";
// import Logo from "./Logo.png";

function Summary() {
  return (
    <>
      <Row>
        <Col className="p-2">
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
