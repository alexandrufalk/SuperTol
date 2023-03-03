import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";
// import Figure from "react-bootstrap/Figure";
// import Logo from "./Logo.png";

const Summary = () => {
  const [projectName, setProjectName] = useState("Enter project name");
  const [projectTemplate, setProjectTemplate] = useState(
    "Select project template"
  );
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
  const DatabaseTemplateName = [
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
    {
      TemplateName: "Test2",
      Data: [
        {
          Index: 1,
          ComponentName: "Cover",
          Color: "Blue",
        },
        {
          Index: 2,
          ComponentName: "Housing",
          Color: "Red",
        },
        {
          Index: 3,
          ComponentName: "Connector",
          Color: "Green",
        },
      ],
    },
  ];

  const DatabaseProject = [
    {
      ProjectName: "Test Name1",
      ProjectTemplate: "test Template1",
    },
  ];
  console.log("DatabaseProject", DatabaseProject);

  const saveData = (e) => {
    e.preventDefault();
    if (
      projectName === "Enter project name" ||
      projectName === "" ||
      projectTemplate === "Select project template"
    ) {
      alert("Project name and template are missing");
    } else {
      e.preventDefault();
      DatabaseProject.push({
        ProjectName: projectName,
        ProjectTemplate: projectTemplate,
      });
      console.log("DatabaseProject", DatabaseProject);
      setProjectName("Enter project name");
      setProjectTemplate("Select project template");
    }
  };
  const handeleProjectName = (e) => {
    setProjectName(e.target.value);
  };

  const handeleProjectTemplate = (e) => {
    setProjectTemplate(e);
  };
  console.log("Project Name", projectName);
  console.log("Template Name", projectTemplate);

  // function alertHi(e) {
  //   e.preventDefault();
  //   console.log(projectName, "+", projectTemplate);
  // }

  return (
    <>
      <Row>
        <Col className="p-2">
          <Form className="p-2">
            <Row>
              <Col>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter project name"
                    onChange={handeleProjectName}
                    value={projectName}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Project Template</Form.Label>
                  {/* <Form.Control
                    type="text"
                    placeholder="Enter project template name"
                  /> */}
                  <DropdownButton
                    title={projectTemplate}
                    onSelect={handeleProjectTemplate}
                    variant="secondary"
                  >
                    {/* <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      {projectTemplate}
                    </Dropdown.Toggle> */}

                    {DatabaseTemplateName.map((n) => (
                      <Dropdown.Item
                        eventKey={n.TemplateName}
                        key={n.TemplateName}
                      >
                        {n.TemplateName}
                      </Dropdown.Item>
                    ))}
                    {/* <Dropdown.Item href="#/action-1">Housing</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Cover</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">PCB</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Screw</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Shaft</Dropdown.Item> */}
                  </DropdownButton>
                </Form.Group>
              </Col>
            </Row>
            <Button
              variant="secondary"
              type="submit"
              onClick={(e) => saveData(e)}
            >
              Save
            </Button>
            {/* <button onClick={alertHi}>Test</button> */}
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
};

export default Summary;
