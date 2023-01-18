import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";

const AddComponent = () => {
  return (
    <>
      <p className="fs-3 border border-success-subtle p-2 rounded">
        Add Component
      </p>
      <p className="fs-4 border border-success-subtle p-2 rounded">
        Project Name
      </p>
      <Form className="p-2">
        <Row>
          <Col>
            <Row>
              <Col>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Name of component
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Housing</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Cover</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">PCB</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Screw</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Shaft</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                <p>Color (from database)</p>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter description" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Drw. nr.</Form.Label>
              <Form.Control type="text" placeholder="Enter drawing number" />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Nominal Value</Form.Label>
                  <Form.Control type="text" placeholder="Enter nominal value" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Upper Limit</Form.Label>
                  <Form.Control type="text" placeholder="Enter upper limit" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Lower Limit</Form.Label>
                  <Form.Control type="text" placeholder="Enter lower Limit" />
                </Form.Group>
              </Col>
            </Row>

            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Tolerance Type
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">
                  General Tolerance
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                  Imposed Tolerance
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Distribution Type
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Normal Cpk 1</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Normal Cpk 1.33</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Normal Cpk 1.66</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Normal Cpk 2</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Normal Cpk 1.33</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Uniform</Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                  Normal Cpk Custom:
                </Dropdown.Item>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control type="text" placeholder="Enter Cpk" />
                </Form.Group>
              </Dropdown.Menu>
            </Dropdown>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Samples</Form.Label>
              <Form.Control type="text" placeholder="Enter number of samples" />
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button variant="secondary" type="submit" className="px-2">
            OK
          </Button>
          <Button variant="danger" type="submit" className="px-2">
            Cancel
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddComponent;
