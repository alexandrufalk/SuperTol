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
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDatabaseProjects from "../../Hooks/useDatabaseProject";
import useTemplate from "../../Hooks/useTemplate";
import "./Summary.css";

// import { useBetween } from "use-between";
// import { useSharable } from "../../App";

// import Figure from "react-bootstrap/Figure";
// import Logo from "./Logo.png";

const Summary = ({ NewTemplate }) => {
  const {
    databaseProjects,
    addNewProject,
    removeProject,
    addNewCase,
    removeCase,
  } = useDatabaseProjects();
  const { templates } = useTemplate();
  console.log("loaded databaseProjects:", databaseProjects);

  console.log("loaded templates:", templates);
  const [isDatabaseProjects, setIsdatabaseProjects] = useState(false);
  console.log("databaseProjects", databaseProjects);
  const [projectName, setProjectName] = useState("Enter project name");
  const [projectTemplate, setProjectTemplate] = useState(
    "Select project template"
  );
  const [selectProject, setSelectproject] = useState("Select project name");

  //to update cases when one is removed
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [databaseSummryFiltered, setDatabaseSummryFiltered] = useState([]);
  // const {
  //   databaseSummryFiltered,
  //   setDatabaseSummryFiltered,
  //   projectSelected,
  //   setProjectSelected,
  // } = useSharable();
  const [projectSelected, setProjectSelected] = useState(false);
  const [newProject, setNewProject] = useState(false);
  const [viewAddCase, setViewAddCase] = useState(false);
  const [caseCaseName, setCaseCaseName] = useState("");

  // const DatabaseSummry = [
  //   {
  //     ProjectName: "Test Name1",
  //     TemplateName: "Test Template1",
  //     DataCase: [
  //       {
  //         ID: 1,
  //         CaseName: "Case1",
  //         Description: "Gap housing-cover",
  //         Author: "Alex",
  //         Date: "Data",
  //       },
  //       {
  //         ID: 2,
  //         CaseName: "Case2",
  //         Description: "Gap housing-PCB",
  //         Author: "Alex",
  //         Date: "Data",
  //       },
  //       {
  //         ID: 3,
  //         CaseName: "Case3",
  //         Description: "Gap PCB-cover",
  //         Author: "Alex",
  //         Date: "Data",
  //       },
  //     ],
  //   },
  //   {
  //     ProjectName: "Test Name2",
  //     TemplateName: "Test Template2",
  //     DataCase: [
  //       {
  //         ID: 1,
  //         CaseName: "Case1",
  //         Description: "Gap housing-cover",
  //         Author: "Alex",
  //         Date: "Data",
  //       },
  //       {
  //         ID: 2,
  //         CaseName: "Case2",
  //         Description: "Gap housing-PCB",
  //         Author: "Alex",
  //         Date: "Data",
  //       },
  //       {
  //         ID: 3,
  //         CaseName: "Case3",
  //         Description: "Gap PCB-cover",
  //         Author: "Alex",
  //         Date: "Data",
  //       },
  //     ],
  //   },
  // ];
  // const DatabaseTemplateName = [
  //   {
  //     TemplateName: "Test Template1",
  //     Data: [
  //       {
  //         Index: 1,
  //         ComponentName: "Housing",
  //         Color: "Blue",
  //       },
  //       {
  //         Index: 2,
  //         ComponentName: "Cover",
  //         Color: "Red",
  //       },
  //       {
  //         Index: 3,
  //         ComponentName: "PCB",
  //         Color: "Green",
  //       },
  //     ],
  //   },
  //   {
  //     TemplateName: "Test Template2",
  //     Data: [
  //       {
  //         Index: 1,
  //         ComponentName: "Cover",
  //         Color: "Blue",
  //       },
  //       {
  //         Index: 2,
  //         ComponentName: "Housing",
  //         Color: "Red",
  //       },
  //       {
  //         Index: 3,
  //         ComponentName: "Connector",
  //         Color: "Green",
  //       },
  //     ],
  //   },
  // ];

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
    useState(databaseProjects);
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

  const databaseProjectIsupdate = () => {
    if (databaseProjects.length > 0) {
      setIsdatabaseProjects(true);
      setDatabaseSummryUpdate(databaseProjects);
    }
  };
  useEffect(() => {
    databaseProjectIsupdate();
  }, [databaseProjects]);

  useEffect(() => {
    const databases = [databaseSummryUpdate];
    window.localStorage.setItem("databases", JSON.stringify(databases));
  }, [databaseSummryUpdate]);

  const AddCase = (e) => {
    e.preventDefault();
    if (caseCaseName !== "") {
      const index = databaseSummryUpdate.findIndex(
        (x) => x.ProjectName === selectProject
      );
      const lastID = Math.max(
        ...databaseSummryUpdate[index].DataCase.map((o) => o.ID)
      );
      const ProjectName = databaseSummryUpdate[index].ProjectName;
      console.log("ProjectName when adding case:", ProjectName);
      let newID = 0;
      if (lastID === -Infinity) {
        newID = 1;
      } else {
        newID = lastID + 1;
      }

      console.log("lastID", lastID);
      console.log("index", index);
      // const nCase = {
      //   ID: newID,
      //   CaseName: `Case${newID}`,
      //   Description: caseCaseName,
      //   Author: "Alex",
      //   Date: "Date",
      // };
      const id = index + 1;

      addNewCase(id, {
        ID: newID,
        CaseName: `Case${newID}`,
        Description: caseCaseName,
        Author: "Alex",
      });

      // databaseSummryUpdate[index].DataCase.push(nCase);
      // const DatabaseUpdate = databaseSummryUpdate;

      // setDatabaseSummryUpdate(DatabaseUpdate);
      // console.log("test output", DatabaseUpdate);

      setViewAddCase(false);
      setCaseCaseName("");
      setDatabaseSummryUpdate(databaseProjects);
      console.log("AddCase databaseProjects", databaseProjects);
      DatabaseFilter(ProjectName);
      // Force a component rerender

      // console.log("caseCaseName", caseCaseName);
      console.log("databaseSummryUpdate Add Case", databaseSummryUpdate);
    } else {
      toast("Add CaseName", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    }
  };

  const RemoveCase = (e) => {
    let obj = databaseSummryFiltered[0].DataCase.find((o) => o.ID === e);
    let index = databaseSummryFiltered[0].DataCase.indexOf(obj);
    let update = databaseSummryFiltered;
    const projectId = databaseSummryFiltered[0].ID;
    const caseId = e;

    console.log("Summary Case remove ids:", projectId, caseId);

    if (index > -1) {
      update[0].DataCase.splice(index, 1);
    }

    console.log("update", update);

    console.log("index", index);
    // alert(`Case ${e} removed`);
    console.log("remove obj", obj);
    setDatabaseSummryFiltered(update);
    removeCase(projectId, caseId);
  };

  const RemoveProject = (e) => {
    removeProject(e);
  };

  console.log("databaseSummryFiltered after Revmove", databaseSummryFiltered);

  const saveData = (e) => {
    e.preventDefault();
    if (
      projectName === "Enter project name" ||
      projectName === "" ||
      projectTemplate === "Select project template"
    ) {
      toast("Project name and template are missing", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    } else {
      const arrObjIds = databaseSummryUpdate.map((elements) => {
        return elements.ID;
      });
      console.log("arrObjIds", arrObjIds);
      const lastID = Math.max(...arrObjIds);
      let newID = 0;
      if (lastID === -Infinity) {
        newID = 1;
      } else {
        newID = lastID + 1;
      }
      console.log("newID", newID);
      e.preventDefault();
      addNewProject({
        ID: newID,
        ProjectName: projectName,
        TemplateName: projectTemplate,
        DataCase: [],
        DatabaseDim: [],
      });
      // databaseSummryUpdate.push({
      //   ID: newID,
      //   ProjectName: projectName,
      //   TemplateName: projectTemplate,
      //   DataCase: [],
      // });
      // const DatabaseUpdate2 = databaseSummryUpdate;
      // setDatabaseSummryUpdate(DatabaseUpdate2);
      // console.log("DatabaseUpdate2", DatabaseUpdate2);
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
      toast("Select project name!", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    }
  };
  const handleCaseNameChange = (e) => {
    e.preventDefault();
    setCaseCaseName(e.target.value);
  };
  // console.log("caseCaseName", caseCaseName);

  // useEffect(() => {
  //   setDatabaseSummryFiltered(databaseSummryFiltered);
  // }, [databaseSummryFiltered]);

  return (
    <Row className="border border-success-subtle rounded justify-content-between shadow-lg opacity-85 mb-1 ">
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

                      {templates.map((n) => (
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
          <ToastContainer transition={Bounce} autoClose={2000} />
          <DropdownButton
            title={selectProject}
            onSelect={(e) => {
              DatabaseFilter(e);
              handleSelectProjectname(e);
            }}
            variant="secondary"
          >
            <div className="p-2 bg-dark bg-gradient text-white rounded shadow-lg">
              {isDatabaseProjects &&
                databaseSummryUpdate.map((n) => (
                  <Row key={n.ID + "Summary"}>
                    <Col>
                      <Dropdown.Item
                        eventKey={n.ProjectName}
                        className="text-info dropdown-project"
                      >
                        {n.ProjectName}
                      </Dropdown.Item>
                    </Col>
                    <Col>
                      <td key={n.ID + "Remove"}>
                        <Button
                          size="sm"
                          type="button"
                          variant="outline-danger"
                          onClick={() => {
                            RemoveProject(n.ID);
                            forceUpdate();
                          }}
                        >
                          X
                        </Button>
                      </td>
                    </Col>
                  </Row>
                ))}
              <Dropdown.Item
                eventKey={"New Project"}
                className="text-info dropdown-newproject"
              >
                New Project
              </Dropdown.Item>
            </div>
          </DropdownButton>

          <Container className="p-3  ">
            <div className="scrollmenu">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Case Name</th>
                    <th>CaseName</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {projectSelected &&
                    databaseSummryFiltered[0].DataCase.map((n) => (
                      <tr key={n.ID + "Summary table"}>
                        <td key={n.ID + "Summary table td"}> {n.ID}</td>
                        <td key={n.ID + n.CaseName}> {n.CaseName}</td>
                        <td key={n.ID + n.Description}> {n.Description}</td>
                        <td key={n.ID + n.Author}> {n.Author}</td>
                        <td key={n.ID + n.Date}> {n.Date}</td>
                        <td key={n.ID + "Remove case summary"}>
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
            </div>
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
            <Form.Label>CaseName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter CaseName"
              onChange={handleCaseNameChange}
            />
          </Form.Group>

          <Button type="button" variant="secondary" onClick={(e) => AddCase(e)}>
            Add
          </Button>
        </Form>
      )}
    </Row>
  );
};

export default Summary;
