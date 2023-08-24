import { useState, useEffect } from "react";
import React from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTemplate from "../../Hooks/useTemplate";

const Template = ({ CloseTemplate }) => {
  const [viewAddComponent, setViewAddComponent] = useState(false);
  const [templateName, setTemplatename] = useState("");
  //to update template components when one is removed
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [viewAddTemplateName, setViewAddTemplateName] = useState(true);
  const [viewSelectTemplate, setViewSelectTemplate] = useState(false);
  const [selectTemplate, setSelectTemplate] = useState("Select template name");
  const [databaseTemplateFiltered, setDatabaseTemplateFiltered] = useState([]);
  const [templateSelected, setTemplateSelected] = useState(false);
  const [componentDescription, setComponentDescription] = useState("");
  const [color, setColor] = useState("");
  const {
    templates,
    addNewTemplate,
    removeTemplate,
    addDataToTemplate,
    removeDataFromTemplate,
  } = useTemplate();

  console.log("Template-templates", templates);

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
    useState(templates);
  console.log("databaseTemplateUpdate", databaseTemplateUpdate);

  useEffect(() => {
    const dataT = JSON.parse(window.localStorage.getItem("databasesT"));
    console.log("dataT", dataT);
    if (dataT) {
      setDatabaseTemplateUpdate(dataT[0]);
      // setDatabaseProjectUpdate(data[1]);
    }
  }, []);
  console.log("useEffect DatabaseTemplateUpdate", databaseTemplateUpdate);

  useEffect(() => {
    const databasesT = [databaseTemplateUpdate];
    window.localStorage.setItem("databasesT", JSON.stringify(databasesT));
  }, [databaseTemplateUpdate]);

  const handleTemplateName = (e) => {
    e.preventDefault();
    setTemplatename(e.target.value);
  };
  const databaseTemplateIsupdate = () => {
    if (templates.length > 0) {
      // setIsdatabaseProjects(true);
      setDatabaseTemplateUpdate(templates);
    }
  };
  useEffect(() => {
    databaseTemplateIsupdate();
  }, [templates]);

  // console.log("Template Name", templateName);
  const AddTemplate = (e) => {
    e.preventDefault();
    if (templateName === "Enter Template Name" || templateName === "") {
      toast("Project name and template are missing", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    } else {
      const arrObjIds = databaseTemplateUpdate.map((elements) => {
        return elements.ID;
      });
      const lastID = Math.max(...arrObjIds);
      let newID = 0;
      if (lastID === -Infinity) {
        newID = 1;
      } else {
        newID = lastID + 1;
      }
      console.log("Template arrObjIds", arrObjIds);
      e.preventDefault();
      addNewTemplate({
        ID: newID,
        TemplateName: templateName,
        Data: [],
      });
      // databaseTemplateUpdate.push({
      //   TemplateName: templateName,
      //   Data: [],
      // });
      console.log("DatabaseTemplateName", DatabaseTemplateName);
      setViewAddTemplateName(false);
      setViewAddComponent(false);
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
    console.log("templete filter event", e);
    if (e !== "New Template" && e !== "Select template name") {
      console.log("test select");
      setDatabaseTemplateFiltered(
        databaseTemplateUpdate.filter((data) => data.TemplateName === e)
      );
      setTemplateSelected(true);
      setViewAddTemplateName(false);
    } else {
      console.log("New template selected");
      setTemplateSelected(false);
      setViewAddTemplateName(true);
      setViewSelectTemplate(false);
      setSelectTemplate("Select template name");
      console.log("templateSelected", templateSelected);
    }
  };

  const AddComponent = () => {
    if (componentDescription !== "" && color !== "") {
      const index = databaseTemplateUpdate.findIndex(
        (x) => x.TemplateName === selectTemplate
      );
      console.log("index", index);
      const lastID = Math.max(
        ...databaseTemplateUpdate[index].Data.map((o) => o.Index)
      );
      let newID = 0;
      if (lastID === -Infinity) {
        newID = 1;
      } else {
        newID = lastID + 1;
      }

      console.log("lastID", lastID);

      const id = index + 1;

      addDataToTemplate(id, {
        Index: newID,
        ComponentName: componentDescription,
        Color: color,
      });

      // const nComponent = {
      //   Index: newID,
      //   ComponentName: componentDescription,
      //   Color: color,
      // };

      // databaseTemplateUpdate[index].Data.push(nComponent);
      // const DatabaseUpdateT = databaseTemplateUpdate;
      setComponentDescription("");
      setColor("");

      // setDatabaseTemplateUpdate(DatabaseUpdateT);
      // console.log("test new component");
      setViewAddComponent(false);
    } else {
      toast("Add description and color", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    }
  };
  const RemoveCase = (e) => {
    let obj = databaseTemplateFiltered[0].Data.find((o) => o.Index === e);
    let index = databaseTemplateFiltered[0].Data.indexOf(obj);
    let update = databaseTemplateFiltered;

    if (index > -1) {
      update[0].Data.splice(index, 1);
    }

    console.log("update", update);

    console.log("index", index);
    // alert(`Case ${e} removed`);
    console.log("remove obj", obj);
    setDatabaseTemplateFiltered(update);
  };

  const SetNewComponent = (e) => {
    e.preventDefault();
    if (templateSelected) {
      setViewAddComponent(true);
    } else {
      toast("Select Project Name!", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    }
  };
  const handleCaseDescriptionChange = (e) => {
    e.preventDefault();
    setComponentDescription(e.target.value);
  };

  console.log("databaseTemplateFiltered", databaseTemplateFiltered);
  console.log("colorPicker", color);

  return (
    <Row className="border border-success-subtle rounded justify-content-between shadow-lg opacity-85 mb-1">
      <Row>
        <Col className="d-flex align-items-center">
          <p className="fs-3 p-2 m-0">Template</p>
        </Col>
        <Col md="auto" className="align-self-center">
          <Button
            variant="outline-danger"
            type="button"
            onClick={CloseTemplate}
          >
            X
          </Button>
        </Col>
      </Row>

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
          <ToastContainer transition={Bounce} autoClose={2000} />

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
          <Dropdown.Item eventKey={"New Template"} key={"New Template"}>
            New Template
          </Dropdown.Item>
          {/* <Dropdown.Item href="#/action-1">Housing</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Cover</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">PCB</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Screw</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Shaft</Dropdown.Item> */}
        </DropdownButton>
      )}
      {templateSelected && (
        <Row>
          <Container className="p-3">
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Component name</th>
                  <th>Color</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {databaseTemplateFiltered[0].Data.map((n) => (
                  <tr key={n.Index + "template table"}>
                    <td key={n.Index + "template table td"}> {n.Index}</td>
                    <td key={n.ComponentName + n.Index}>{n.ComponentName}</td>
                    <td key={n.Color + n.Index}> {n.Color}</td>
                    <td key={n.Index + "Remove template"}>
                      <Button
                        type="button"
                        variant="outline-danger"
                        onClick={() => {
                          RemoveCase(n.Index);
                          forceUpdate();
                        }}
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </Row>
      )}
      <div className="container fluid p-2">
        <Form.Group>
          <Button
            type="button"
            variant="secondary"
            onClick={(e) => SetNewComponent(e)}
          >
            Add Component
          </Button>
        </Form.Group>
        {viewAddComponent && (
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Component Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Coponent Name"
                    onChange={handleCaseDescriptionChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Row>
                  <Form.Label>Select Color</Form.Label>
                </Row>

                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </Col>
            </Row>

            <Button
              type="button"
              variant="secondary"
              onClick={(e) => AddComponent(e)}
            >
              Add
            </Button>
          </Form>
        )}
      </div>
    </Row>
  );
};

export default Template;
