import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const Template = () => {
  const DatabaseTest = [
    {
      TemplateName: "Test",
      Data: [
        {
          Index: 1,
          ComponentName: "Housing",
          Color: "Blue",
        },
        {
          Index: 2,
          ComponentName: "Cover",
          Color: "Red",
        },
        {
          Index: 3,
          ComponentName: "PCB",
          Color: "Green",
        },
      ],
    },
  ];

  const DatabaseTemplate = [
    {
      Index: 1,
      ComponentName: "Housing",
      Color: "Blue",
    },
    {
      Index: 2,
      ComponentName: "Cover",
      Color: "Red",
    },
    {
      Index: 3,
      ComponentName: "PCB",
      Color: "Green",
    },
  ];

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
              {DatabaseTemplate.map((n) => (
                <tr key={n.Index}>
                  <td key={n.Index}> {n.Index}</td>
                  <td key={n.Index + n.ComponentName}> {n.ComponentName}</td>
                  <td key={n.Index + n.Color}> {n.Color}</td>
                </tr>
              ))}
              {DatabaseTest[0].Data.map((n) => (
                <tr key={n.Index + "test"}>
                  <td key={n.Index + "test"}> {n.Index}</td>
                  <td key={n.ComponentName + n.Index}> {n.ComponentName}</td>
                  <td key={n.Color + n.Index}> {n.Color}</td>
                </tr>
              ))}

              {/* <tr>
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
              </tr> */}
            </tbody>
          </Table>
        </Container>
      </Row>
      <div className="container fluid p-2">
        <Button variant="secondary" type="submit">
          Save
        </Button>
      </div>
    </>
  );
};

export default Template;
