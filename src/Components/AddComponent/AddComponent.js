import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";

const AddComponent = ({ Database }) => {
  console.log("Database from ADDComponent", Database);
  const [viewComponents, setViewComponents] = useState("Name of component");
  const [selectedColor, SetSelectedColor] = useState("");
  const [testDatabase, setTestDatabase] = useState(Database);
  const DatabaseTemplateName = [
    {
      TemplateName: "Test Template1",
      Data: [
        {
          Index: 1,
          ComponentName: "Housing1",
          Color: "Blue",
        },
        {
          Index: 2,
          ComponentName: "Cover1",
          Color: "Red",
        },
        {
          Index: 3,
          ComponentName: "PCB1",
          Color: "Green",
        },
      ],
    },
    {
      TemplateName: "Test Template2",
      Data: [
        {
          Index: 1,
          ComponentName: "Cover2",
          Color: "Blue",
        },
        {
          Index: 2,
          ComponentName: "Housing2",
          Color: "Red",
        },
        {
          Index: 3,
          ComponentName: "Connector2",
          Color: "Green",
        },
      ],
    },
    {
      TemplateName: "Test Template3",
      Data: [],
    },
  ];
  const TemplateDatabaseFilter = (e) => {
    if (e !== "New Component" && e !== "Name of component") {
      console.log("test select");
      SetSelectedColor(
        DatabaseTemplateName.filter((data) => data.TemplateName === e)
      );
      // setTemplateSelected(true);
      // setViewAddTemplateName(false);
    } else {
      console.log("New template selected");
      // setTemplateSelected(false);
      // setViewAddTemplateName(true);
      // setViewSelectTemplate(false);
      // setSelectTemplate("Select template name");
    }
  };

  return (
    <>
      <p className="fs-3 border border-success-subtle p-2 rounded">
        Add Component
      </p>
      <p className="fs-4 border border-success-subtle p-2 rounded">
        Project Name:{testDatabase[0].ProjectName}
      </p>
      <Form className="p-2">
        <Row>
          <Col>
            <Row>
              <Col>
                <DropdownButton
                  title={viewComponents}
                  onSelect={(e) => {
                    TemplateDatabaseFilter(e);
                    // handleSelectTemplate(e);
                  }}
                  variant="secondary"
                >
                  {/* <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      {projectTemplate}
                    </Dropdown.Toggle> */}

                  {DatabaseTemplateName[0].Data.map((n) => (
                    <Dropdown.Item
                      eventKey={n.ComponentName}
                      key={n.ComponentName}
                    >
                      {n.ComponentName}
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Item eventKey={"New Template"} key={"New Template"}>
                    New Component
                  </Dropdown.Item>
                </DropdownButton>
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
