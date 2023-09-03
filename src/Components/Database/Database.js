import { useState, useEffect } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/esm/Table";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./database.css";

import ImportImage from "../ImportImage/ImportImage.tsx";
import AddComponent from "../AddComponent/AddComponent";
import useDatabaseProjects from "../../Hooks/useDatabaseProject";
import useTemplate from "../../Hooks/useTemplate";

const Database = ({ CloseDatabase }) => {
  const { databaseProjects, removeDim } = useDatabaseProjects();
  const [viewAddComponentData, setViewAddComponentData] = useState(false);

  const [databaseFiltered, setDatabaseFiltered] = useState([]);
  const [projectSelected, setProjectSelected] = useState(false);
  const [selectProjectData, setSelectprojectData] = useState(
    "Select project name"
  );
  const [viewCancel, setViewCancel] = useState(false);
  const [viewAddComponent, setViewAddComponent] = useState(true);
  const [templateUpdate, setTemplateUpdate] = useState([]);
  const [isTemplate, setIsTemplate] = useState(false);
  const [componentData, setComponentData] = useState();

  // console.log("Database", Database);

  const [DatabaseUpdate, setDatabaseUpdate] = useState(databaseProjects);
  const { templates } = useTemplate();

  useEffect(() => {
    const dataU = JSON.parse(window.localStorage.getItem("DatabasesU"));
    console.log("dataU", dataU);
    if (dataU) {
      setDatabaseUpdate(dataU[0]);
      // setDatabaseProjectUpdate(data[1]);
    }
  }, []);
  console.log("useEffect DatabaseUpdate", DatabaseUpdate);
  useEffect(() => {
    templateIsUpdate();
  }, [templates]);

  const templateIsUpdate = () => {
    if (templates.length > 0) {
      setTemplateUpdate(templates);
    }
  };

  const databaseProjectIsupdate = () => {
    if (databaseProjects.length > 0) {
      // setIsdatabaseProjects(true);
      setDatabaseUpdate(databaseProjects);
    }
  };
  useEffect(() => {
    databaseProjectIsupdate();
  }, [databaseProjects]);

  useEffect(() => {
    const DatabasesU = [DatabaseUpdate];
    window.localStorage.setItem("DatabasesU", JSON.stringify(DatabasesU));
    console.log("Database was updated");
    if (selectProjectData !== "Select project name") {
      DatabasesFilter(selectProjectData);
    }
  }, [DatabaseUpdate]);

  const SetViewAdd = () => {
    if (selectProjectData !== "Select project name") {
      setViewAddComponentData(true);
      setViewCancel(true);
      setViewAddComponent(false);
    } else {
      toast("Select Project Name!", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    }
  };

  const SetViewAddCancel = () => {
    setViewAddComponentData(false);
    setViewAddComponent(true);
  };
  console.log("DatabaseUpdate", DatabaseUpdate);

  const DatabasesFilter = (e) => {
    if (e !== "Select project name" && e !== "New Project") {
      setDatabaseFiltered(
        DatabaseUpdate.filter((data) => data.ProjectName === e)
      );
      setProjectSelected(true);
      // setNewProject(false);
    } else {
      console.log("Error");
    }
  };
  const handleSelectProjectnameData = (e) => {
    setSelectprojectData(e);
  };
  console.log("databaseFiltered", databaseFiltered);

  const TemplateComponentFiltered = () => {
    const TemplateN = databaseFiltered[0].TemplateName;
    const filteredTemplate = templateUpdate.filter(
      (data) => data.TemplateName === TemplateN
    );
    console.log("TemplateN", TemplateN);
    console.log("TemplateComponentFiltered", filteredTemplate);
    if (filteredTemplate.length > 0) {
      setComponentData(filteredTemplate);
      setIsTemplate(true);
    }
  };

  const RemoveDim = (e) => {
    let obj = databaseFiltered[0].DatabaseDim.find((o) => o.ID === e);
    let index = databaseFiltered[0].DatabaseDim.indexOf(obj);
    let update = databaseFiltered;
    const projectId = databaseFiltered[0].ID;
    const dimId = e;

    console.log("Dim remove ids:", projectId, dimId);

    if (index > -1) {
      update[0].DatabaseDim.splice(index, 1);
    }

    console.log("update", update);

    console.log("index", index);
    // alert(`Case ${e} removed`);
    console.log("remove obj", obj);
    setDatabaseFiltered(update);
    removeDim(projectId, dimId);
  };
  return (
    <Row className="border border-success-subtle rounded justify-content-between shadow-lg opacity-85 mb-1">
      <Row>
        <Col className="d-flex align-items-center">
          <p className="fs-3 ">Database</p>
        </Col>
        <Col md="auto" className="align-self-center">
          <Button
            variant="outline-danger"
            type="button"
            onClick={CloseDatabase}
          >
            X
          </Button>
        </Col>
      </Row>

      <DropdownButton
        title={selectProjectData}
        onSelect={(e) => {
          DatabasesFilter(e);

          handleSelectProjectnameData(e);
        }}
        variant="secondary"
      >
        {/* <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      {projectTemplate}
                    </Dropdown.Toggle> */}

        {DatabaseUpdate.map((n) => (
          <Dropdown.Item eventKey={n.ProjectName} key={n.ProjectName}>
            {n.ProjectName}
          </Dropdown.Item>
        ))}
        {/* <Dropdown.Item eventKey={"New Project"} key={"New Project"}>
          New Project
        </Dropdown.Item> */}
      </DropdownButton>
      <ToastContainer transition={Bounce} autoClose={2000} />

      {projectSelected && (
        <Row>
          <div className="container horizontal-scrollable">
            <div className="row text-center">
              <Container className="p-3">
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Index</th>
                      {databaseFiltered[0].DatabaseDim.map((n) => (
                        <td
                          key={n.ID + "Database"}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.ID}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Name</th>
                      {databaseFiltered[0].DatabaseDim.map((n) => (
                        <td
                          key={n.ID + n.Name}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {" "}
                          {n.Name}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Description</th>
                      {databaseFiltered[0].DatabaseDim.map((n) => (
                        <td
                          key={n.ID + n.Description}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.Description}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Unique Identifier</th>
                      {databaseFiltered[0].DatabaseDim.map((n) => (
                        <td
                          key={n.ID + n.UniqueIdentifier}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.UniqueIdentifier}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Drw. nr.</th>
                      {databaseFiltered[0].DatabaseDim.map((n) => (
                        <td
                          key={n.ID + n.DrwNr}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.DrwNr}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Nominal Value</th>
                      {databaseFiltered[0].DatabaseDim.map((n) => (
                        <td
                          key={n.ID + "NominalValue"}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.NominalValue}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Upper Tolerance</th>
                      {databaseFiltered[0].DatabaseDim.map((n) => (
                        <td
                          key={n.ID + n.UpperTolerance}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.UpperTolerance}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Lower Tolerance</th>
                      {databaseFiltered[0].DatabaseDim.map((n) => (
                        <td
                          key={n.ID + n.LowerTolerance}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.LowerTolerance}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Upper Limit</th>
                      {databaseFiltered[0].DatabaseDim.map((n) => (
                        <td
                          key={n.ID + n.NominalValue + n.UpperTolerance}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {(n.NominalValue + n.UpperTolerance).toFixed(3)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Lower Limit</th>
                      {databaseFiltered[0].DatabaseDim.map((n) => (
                        <td
                          key={n.ID + n.NominalValue + n.LowerTolerance}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {(n.NominalValue + n.LowerTolerance).toFixed(3)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Tolerance Range</th>
                      {databaseFiltered[0].DatabaseDim.map((n) => (
                        <td
                          key={
                            n.ID + n.UpperTolerance + "minu" + n.LowerTolerance
                          }
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.UpperTolerance - n.LowerTolerance}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Sign</th>
                      {databaseFiltered[0].DatabaseDim.map((n) => (
                        <td
                          key={n.ID + "Sign"}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.Sign}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Distribution Type</th>
                      {databaseFiltered[0].DatabaseDim.map((n) => (
                        <td
                          key={n.ID + n.DistributionType}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {" "}
                          {n.DistributionType}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Tolerance Type</th>
                      {databaseFiltered[0].DatabaseDim.map((n) => (
                        <td
                          key={n.ID + n.ToleranceType}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.ToleranceType}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Standard Deviation</th>
                      {databaseFiltered[0].DatabaseDim.map((n) => (
                        <td
                          key={n.ID + "Std"}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {Math.round(
                            ((n.UpperTolerance - n.LowerTolerance) /
                              (6 *
                                parseFloat(
                                  n.DistributionType.replace(/[^\d.]*/g, "")
                                )) +
                              Number.EPSILON) *
                              100
                          ) / 100}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Mean</th>
                      {databaseFiltered[0].DatabaseDim.map((n) => (
                        <td
                          key={n.ID + "Mean"}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {(
                            (n.NominalValue +
                              n.UpperTolerance +
                              n.NominalValue +
                              n.LowerTolerance) /
                            2
                          ).toFixed(3)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Drawing</th>
                      {databaseFiltered[0].DatabaseDim.map((n) => (
                        <td key={n.ID + "Drawing"}>
                          <div className="addImage">
                            {/* <AddImage index={n.ID} /> */}
                            {/* <Image
                            width={150}
                            src={
                              "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png"
                            }
                          /> */}
                            <ImportImage />
                          </div>
                        </td>
                      ))}
                    </tr>
                    {/* <tr>
                      <th>Distribution Graph</th>
                      {databaseFiltered[0].DatabaseDim.map((n) => (
                        <td key={n.ID + "graph"}>graph{n.ID}</td>
                      ))}
                    </tr> */}
                    <tr>
                      <th>Delete</th>
                      {databaseFiltered[0].DatabaseDim.map((n) => (
                        <td key={n.ID + "Remove case summary"}>
                          <Button
                            type="button"
                            variant="outline-danger"
                            onClick={() => {
                              RemoveDim(n.ID);
                              // forceUpdate();
                            }}
                          >
                            X
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </thead>
                  <tbody></tbody>
                </Table>
              </Container>
            </div>
          </div>
        </Row>
      )}
      {viewAddComponentData && (
        <Row>
          <AddComponent
            databaseFiltered={databaseFiltered}
            Database={DatabaseUpdate}
            isTemplate={isTemplate}
            // viewAddComponentData={viewAddComponentData}
            setDatabaseUpdate={setDatabaseUpdate}
            componentData={componentData}
          />
          {viewCancel && (
            <div className="d-flex justify-content-between">
              <Button
                variant="danger"
                className="px-2"
                onClick={SetViewAddCancel}
              >
                Cancel
              </Button>
            </div>
          )}
        </Row>
      )}

      {viewAddComponent && (
        <div className="container fluid  text-center ">
          <Button
            variant="secondary"
            type="submit"
            className="m-2"
            onClick={() => {
              SetViewAdd();
              TemplateComponentFiltered();
            }}
          >
            Add component
          </Button>
        </div>
      )}
    </Row>
  );
};
export default Database;
