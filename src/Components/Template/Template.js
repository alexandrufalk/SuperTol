import { useState, useEffect } from "react";

import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Template = () => {
  const [viewAddComponent, setViewAddComponent] = useState(false);
  const [templateName, setTemplatename] = useState("");
  const [viewAddTemplateName, setViewAddTemplateName] = useState(true);
  const [viewSelectTemplate, setViewSelectTemplate] = useState(false);
  const [selectTemplate, setSelectTemplate] = useState("Select template name");
  const [databaseTemplateFiltered, setDatabaseTemplateFiltered] = useState([]);
  const [templateSelected, setTemplateSelected] = useState(false);
  const [newTemplate, setNewTemplate] = useState(false);

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
  const [databaseTemplateUpdate, setDatabaseTemplateUpdate] =
    useState(DatabaseTemplateName);
  console.log("databaseTemplateUpdate", databaseTemplateUpdate);

  useEffect(() => {
    const dataT = JSON.parse(window.localStorage.getItem("databasesT"));
    console.log("dataT", dataT);
    if (dataT) {
      setDatabaseTemplateUpdate(dataT[0]);
      // setDatabaseProjectUpdate(data[1]);
    }
  }, []);
  console.log("useEffect DatabaseSummryUpdate", databaseTemplateUpdate);

  useEffect(() => {
    const databasesT = [databaseTemplateUpdate];
    window.localStorage.setItem("databasesT", JSON.stringify(databasesT));
  }, [databaseTemplateUpdate]);

  const handleTemplateName = (e) => {
    e.preventDefault();
    setTemplatename(e.target.value);
  };
  // console.log("Template Name", templateName);
  const AddTemplate = (e) => {
    e.preventDefault();
    if (templateName === "Enter Template Name" || templateName === "") {
      alert("Project name and template are missing");
    } else {
      console.log("test");
      e.preventDefault();
      databaseTemplateUpdate.push({
        TemplateName: templateName,
        Data: [],
      });
      console.log("DatabaseTemplateName", DatabaseTemplateName);
      setViewAddTemplateName(false);
      setViewAddComponent(true);
      setViewSelectTemplate(true);
      // const DatabaseUpdate2 = databaseSummryUpdate;
      // setDatabaseSummryUpdate(DatabaseUpdate2);
      // console.log("DatabaseUpdate2", DatabaseUpdate2);
      // setProjectName("Enter project name");
      // setProjectTemplate("Select project template");
      // setNewProject(false);
    }
  };
  const handleSelectTemplate = (e) => {
    setSelectTemplate(e);
  };

  const TemplateFilter = (e) => {
    if (e !== "Select template name" && e !== "New Template") {
      setDatabaseTemplateFiltered(
        databaseTemplateUpdate.filter((data) => data.TemplateName === e)
      );
      setTemplateSelected(true);
      setNewTemplate(false);
      console.log("test select");
    } else if (e === "New Template") {
      setTemplateSelected(false);
      setNewTemplate(true);
      console.log("templateSelected", templateSelected);
      console.log("New template selected");
    }
  };

  console.log("databaseTemplateFiltered", databaseTemplateFiltered);

  return (
    <>
      <p className="fs-3 border border-success-subtle  rounded p-2">Template</p>

      {viewAddTemplateName && (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Template Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Template Name"
              onChange={handleTemplateName}
            />
          </Form.Group>

          <Button
            type="button"
            variant="secondary"
            onClick={(e) => AddTemplate(e)}
          >
            Add Template
          </Button>
        </Form>
      )}
      {viewSelectTemplate && (
        <DropdownButton
          title={selectTemplate}
          onSelect={(e) => {
            TemplateFilter(e);
            handleSelectTemplate(e);
          }}
          variant="secondary"
        >
          {/* <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      {projectTemplate}
                    </Dropdown.Toggle> */}

          {databaseTemplateUpdate.map((n) => (
            <Dropdown.Item eventKey={n.TemplateName} key={n.TemplateName}>
              {n.TemplateName}
            </Dropdown.Item>
          ))}
          <Dropdown.Item eventKey={"New Project"} key={"New Project"}>
            New Template
          </Dropdown.Item>
          {/* <Dropdown.Item href="#/action-1">Housing</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Cover</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">PCB</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Screw</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Shaft</Dropdown.Item> */}
        </DropdownButton>
      )}
      {viewAddComponent && (
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
                {templateSelected &&
                  databaseTemplateFiltered[0].Data.map((n) => (
                    <tr key={n.Index + "test"}>
                      <td key={n.Index + "test"}> {n.Index}</td>
                      <td key={n.ComponentName + n.Index}>{n.ComponentName}</td>
                      <td key={n.Color + n.Index}> {n.Color}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Container>
        </Row>
      )}

      <div className="container fluid p-2">
        <Button variant="secondary" type="submit">
          Save
        </Button>
      </div>
    </>
  );
};

export default Template;
