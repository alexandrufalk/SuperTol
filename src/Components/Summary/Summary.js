import React from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState, useEffect } from "react";

// import Figure from "react-bootstrap/Figure";
// import Logo from "./Logo.png";

const Summary = ({ NewTemplate }) => {
  const [projectName, setProjectName] = useState("Enter project name");
  const [projectTemplate, setProjectTemplate] = useState(
    "Select project template"
  );
  const [selectProject, setSelectproject] = useState("Select project name");

  //to update cases when one is removed
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [databaseSummryFiltered, setDatabaseSummryFiltered] = useState([]);
  const [projectSelected, setProjectSelected] = useState(false);
  const [newProject, setNewProject] = useState(false);
  const [viewAddCase, setViewAddCase] = useState(false);
  const [caseDescription, setCaseDescription] = useState("");

  const DatabaseSummry = [
    {
      ProjectName: "Test Name1",
      TemplateName: "Test Template1",
      DataCase: [
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
      ],
    },
    {
      ProjectName: "Test Name2",
      TemplateName: "Test Template2",
      DataCase: [
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
      ],
    },
  ];
  const DatabaseTemplateName = [
    {
      TemplateName: "Test Template1",
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
      TemplateName: "Test Template2",
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

  // const DatabaseProject = [
  //   {
  //     ProjectName: "Test Name1",
  //     ProjectTemplate: "Test Template1",
  //   },
  //   {
  //     ProjectName: "Test Name2",
  //     ProjectTemplate: "Test Template2",
  //   },
  // ];

  const [databaseSummryUpdate, setDatabaseSummryUpdate] =
    useState(DatabaseSummry);
  console.log("databaseSummryUpdate", databaseSummryUpdate);

  // const [databaseProjectUpdate, setDatabaseProjectUpdate] =
  //   useState(DatabaseProject);

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("databases"));
    console.log("data", data);
    if (data) {
      setDatabaseSummryUpdate(data[0]);
      // setDatabaseProjectUpdate(data[1]);
    }
  }, []);
  console.log("useEffect DatabaseSummryUpdate", databaseSummryUpdate);

  useEffect(() => {
    const databases = [databaseSummryUpdate];
    window.localStorage.setItem("databases", JSON.stringify(databases));
  }, [databaseSummryUpdate]);

  const AddCase = (e) => {
    e.preventDefault();
    if (caseDescription !== "") {
      const index = databaseSummryUpdate.findIndex(
        (x) => x.ProjectName === selectProject
      );
      const lastID = Math.max(
        ...databaseSummryUpdate[index].DataCase.map((o) => o.ID)
      );
      let newID = 0;
      if (lastID === -Infinity) {
        newID = 1;
      } else {
        newID = lastID + 1;
      }

      console.log("lastID", lastID);
      console.log("index", index);
      const nCase = {
        ID: newID,
        Description: `Case${newID}`,
        SheetName: caseDescription,
        Author: "Alex",
        Date: "Date",
      };

      databaseSummryUpdate[index].DataCase.push(nCase);
      const DatabaseUpdate = databaseSummryUpdate;

      setDatabaseSummryUpdate(DatabaseUpdate);
      console.log("test output", DatabaseUpdate);
      setViewAddCase(false);
      setCaseDescription("");

      // console.log("caseDescription", caseDescription);
      console.log("databaseSummryUpdate Add Case", databaseSummryUpdate);
    } else {
      alert("Add description");
    }
  };

  const RemoveCase = (e) => {
    let obj = databaseSummryFiltered[0].DataCase.find((o) => o.ID === e);
    let index = databaseSummryFiltered[0].DataCase.indexOf(obj);
    let update = databaseSummryFiltered;

    if (index > -1) {
      update[0].DataCase.splice(index, 1);
    }

    console.log("update", update);

    console.log("index", index);
    // alert(`Case ${e} removed`);
    console.log("remove obj", obj);
    setDatabaseSummryFiltered(update);
  };

  console.log("databaseSummryFiltered after Revmove", databaseSummryFiltered);

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
      databaseSummryUpdate.push({
        ProjectName: projectName,
        ProjectTemplate: projectTemplate,
        DataCase: [],
      });
      const DatabaseUpdate2 = databaseSummryUpdate;
      setDatabaseSummryUpdate(DatabaseUpdate2);
      console.log("DatabaseUpdate2", DatabaseUpdate2);
      setProjectName("Enter project name");
      setProjectTemplate("Select project template");
      setNewProject(false);
    }
  };
  const handeleProjectName = (e) => {
    setProjectName(e.target.value);
  };

  const handeleProjectTemplate = (e) => {
    setProjectTemplate(e);
  };

  const handleSelectProjectname = (e) => {
    setSelectproject(e);
  };

  console.log("DatabaseSummryFiltered", databaseSummryFiltered);
  console.log("projectSelected", projectSelected);

  console.log("Project Name", projectName);
  console.log("Template Name", projectTemplate);

  const DatabaseFilter = (e) => {
    if (e !== "Select project name" && e !== "New Project") {
      setDatabaseSummryFiltered(
        databaseSummryUpdate.filter((data) => data.ProjectName === e)
      );
      setProjectSelected(true);
      setNewProject(false);
    } else if (e === "New Project") {
      setProjectSelected(false);
      setNewProject(true);
      setSelectproject("Select project name");
    }
  };

  const SetNewCase = (e) => {
    e.preventDefault();
    if (projectSelected) {
      setViewAddCase(true);
    } else {
      alert("Select project");
    }
  };
  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setCaseDescription(e.target.value);
  };
  // console.log("caseDescription", caseDescription);

  // useEffect(() => {
  //   setDatabaseSummryFiltered(databaseSummryFiltered);
  // }, [databaseSummryFiltered]);

  return (
    <>
      <Row>
        <Col className="p-2">
          {newProject && (
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
                      onSelect={(e) => {
                        handeleProjectTemplate(e);
                        NewTemplate(e);
                      }}
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
                      <Dropdown.Item
                        eventKey={"New Template"}
                        key={"New Template"}
                      >
                        New Template
                      </Dropdown.Item>
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
                type="button"
                onClick={(e) => saveData(e)}
              >
                Save
              </Button>
              {/* <button onClick={alertHi}>Test</button> */}
            </Form>
          )}
          <DropdownButton
            title={selectProject}
            onSelect={(e) => {
              DatabaseFilter(e);
              handleSelectProjectname(e);
            }}
            variant="secondary"
          >
            {/* <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      {projectTemplate}
                    </Dropdown.Toggle> */}

            {databaseSummryUpdate.map((n) => (
              <Dropdown.Item eventKey={n.ProjectName} key={n.ProjectName}>
                {n.ProjectName}
              </Dropdown.Item>
            ))}
            <Dropdown.Item eventKey={"New Project"} key={"New Project"}>
              New Project
            </Dropdown.Item>
            {/* <Dropdown.Item href="#/action-1">Housing</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Cover</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">PCB</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Screw</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Shaft</Dropdown.Item> */}
          </DropdownButton>
          <Container className="p-3">
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Case Name</th>
                  <th>Description</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {projectSelected &&
                  databaseSummryFiltered[0].DataCase.map((n) => (
                    <tr key={n.ID}>
                      <td key={n.ID}> {n.ID}</td>
                      <td key={n.ID + n.Description}> {n.Description}</td>
                      <td key={n.ID + n.SheetName}> {n.SheetName}</td>
                      <td key={n.ID + n.Author}> {n.Author}</td>
                      <td key={n.ID + n.Date}> {n.Date}</td>
                      <td key={n.ID + "Remove"}>
                        <Button
                          type="button"
                          variant="outline-danger"
                          onClick={() => {
                            RemoveCase(n.ID);
                            forceUpdate();
                          }}
                        >
                          X
                        </Button>
                      </td>
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
      <Form.Group>
        <Button
          type="button"
          variant="secondary"
          onClick={(e) => SetNewCase(e)}
        >
          Add Case
        </Button>
      </Form.Group>

      {viewAddCase && (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              onChange={handleDescriptionChange}
            />
          </Form.Group>

          <Button type="button" variant="secondary" onClick={(e) => AddCase(e)}>
            Add
          </Button>
        </Form>
      )}
    </>
  );
};

export default Summary;
