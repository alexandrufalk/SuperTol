import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const Template = () => {
  return (
    <>
      <p className="fs-3 border border-success-subtle  rounded p-2">Template</p>
      <Form className="p-2">
        <Row>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Template Name</Form.Label>
            <Form.Control type="text" placeholder="Enter template name" />
          </Form.Group>
        </Row>
      </Form>
      <Row>
        <Container className="p-3">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Index</th>
                <th>Component name</th>
                <th>Color</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Housing</td>
                <td>Blue</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Cover</td>
                <td>Silver</td>
              </tr>
              <tr>
                <td>3</td>
                <td>PCB</td>
                <td>Green</td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </Row>
      <Button variant="secondary" type="submit">
        Save
      </Button>
    </>
  );
};

export default Template;
