import { useState, useEffect } from "react";
import Row from "react-bootstrap/esm/Row";
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

const Database = () => {
  const [viewAddComponentData, setViewAddComponentData] = useState(false);

  const [databaseFiltered, setDatabaseFiltered] = useState([]);
  const [projectSelected, setProjectSelected] = useState(false);
  const [selectProjectData, setSelectprojectData] = useState(
    "Select project name"
  );
  const [viewCancel, setViewCancel] = useState(false);
  const [viewAddComponent, setViewAddComponent] = useState(true);
  const Database = [
    {
      ProjectName: "Test Name1",
      TemplateName: "Test Template1",
      Data: [
        {
          Index: 1,
          Name: "Housing",
          Description: "Dim1",
          UniqueIdentifier: "D1",
          DrwNr: "123",
          NominalValue: 10,
          UpperTolerance: 0.4,
          LowerTolerance: -0.4,
          DistributionType: "Normal Cpk 1.66",
          ToleranceType: "General Tol.",
          Samples: 1000,
        },
        {
          Index: 2,
          Name: "Cover",
          Description: "Dim2",
          UniqueIdentifier: "D2",
          DrwNr: "123",
          NominalValue: 2,
          UpperTolerance: 1,
          LowerTolerance: -1,
          DistributionType: "Normal Cpk 1.33",
          ToleranceType: "General Tol.",
          Samples: 1000,
        },
        {
          Index: 3,
          Name: "Connector",
          Description: "Dim3",
          UniqueIdentifier: "D3",
          DrwNr: "123",
          NominalValue: 10,
          UpperTolerance: 0.2,
          LowerTolerance: -0.2,
          DistributionType: "Normal Cpk 1.66",
          ToleranceType: "General Tol.",
          Samples: 1000,
        },
      ],
    },
    {
      ProjectName: "Test Name2",
      TemplateName: "Test Template2",
      Data: [
        {
          Index: 1,
          Name: "Housing2",
          Description: "Dim21",
          UniqueIdentifier: "D1",
          DrwNr: "123",
          NominalValue: 10,
          UpperTolerance: 0.4,
          LowerTolerance: -0.4,
          DistributionType: "Normal Cpk 1.66",
          ToleranceType: "General Tol.",
          Samples: 1000,
        },
        {
          Index: 2,
          Name: "Cover2",
          Description: "Dim22",
          UniqueIdentifier: "D2",
          DrwNr: "123",
          NominalValue: 2,
          UpperTolerance: 1,
          LowerTolerance: -1,
          DistributionType: "Normal Cpk 1.33",
          ToleranceType: "General Tol.",
          Samples: 1000,
        },
        {
          Index: 3,
          Name: "Connector2",
          Description: "Dim23",
          UniqueIdentifier: "D3",
          DrwNr: "123",
          NominalValue: 10,
          UpperTolerance: 0.2,
          LowerTolerance: -0.2,
          DistributionType: "Normal Cpk 1.66",
          ToleranceType: "General Tol.",
          Samples: 1000,
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
  console.log("Database", Database);

  const [DatabaseUpdate, setDatabaseUpdate] = useState(Database);

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
    const DatabasesU = [DatabaseUpdate];
    window.localStorage.setItem("DatabasesU", JSON.stringify(DatabasesU));
    console.log("Database was updated");
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
  console.log("DatabaseUpdate", DatabaseUpdate[0].Data);

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

  return (
    <Row className="border border-success-subtle rounded justify-content-between shadow-lg opacity-85 mb-1">
      <p className="fs-3 ">Database</p>
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
                      {databaseFiltered[0].Data.map((n) => (
                        <td key={n.Index}> {n.Index}</td>
                      ))}
                    </tr>
                    <tr>
                      <th>Name</th>
                      {databaseFiltered[0].Data.map((n) => (
                        <td key={n.Index}> {n.Name}</td>
                      ))}
                    </tr>
                    <tr>
                      <th>Description</th>
                      {databaseFiltered[0].Data.map((n) => (
                        <td key={n.Index}> {n.Description}</td>
                      ))}
                    </tr>
                    <tr>
                      <th>Unique Identifier</th>
                      {databaseFiltered[0].Data.map((n) => (
                        <td key={n.Index}> {n.UniqueIdentifier}</td>
                      ))}
                    </tr>
                    <tr>
                      <th>Drw. nr.</th>
                      {databaseFiltered[0].Data.map((n) => (
                        <td key={n.Index}> {n.DrwNr}</td>
                      ))}
                    </tr>
                    <tr>
                      <th>Nominal Value</th>
                      {databaseFiltered[0].Data.map((n) => (
                        <td key={n.Index}> {n.NominalValue}</td>
                      ))}
                    </tr>
                    <tr>
                      <th>Upper Tolerance</th>
                      {databaseFiltered[0].Data.map((n) => (
                        <td key={n.Index}> {n.UpperTolerance}</td>
                      ))}
                    </tr>
                    <tr>
                      <th>Lower Tolerance</th>
                      {databaseFiltered[0].Data.map((n) => (
                        <td key={n.Index}> {n.LowerTolerance}</td>
                      ))}
                    </tr>
                    <tr>
                      <th>Upper Limit</th>
                      {databaseFiltered[0].Data.map((n) => (
                        <td key={n.Index}>
                          {n.NominalValue + n.UpperTolerance}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Lower Limit</th>
                      {databaseFiltered[0].Data.map((n) => (
                        <td key={n.Index}>
                          {n.NominalValue + n.LowerTolerance}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Tolerance Range</th>
                      {databaseFiltered[0].Data.map((n) => (
                        <td key={n.Index}>
                          {n.UpperTolerance - n.LowerTolerance}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Distribution Type</th>
                      {databaseFiltered[0].Data.map((n) => (
                        <td key={n.Index}> {n.DistributionType}</td>
                      ))}
                    </tr>
                    <tr>
                      <th>Tolerance Type</th>
                      {databaseFiltered[0].Data.map((n) => (
                        <td key={n.Index}> {n.ToleranceType}</td>
                      ))}
                    </tr>
                    <tr>
                      <th>Standard Deviation</th>
                      {databaseFiltered[0].Data.map((n) => (
                        <td key={n.Index}>
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
                      {databaseFiltered[0].Data.map((n) => (
                        <td key={n.Index}>
                          {(n.NominalValue +
                            n.UpperTolerance +
                            n.NominalValue +
                            n.LowerTolerance) /
                            2}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Drawing</th>
                      {databaseFiltered[0].Data.map((n) => (
                        <td key={n.Index}>
                          <div className="addImage">
                            {/* <AddImage index={n.Index} /> */}
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
                    <tr>
                      <th>Distribution Graph</th>
                      {databaseFiltered[0].Data.map((n) => (
                        <td key={n.Index}>graph{n.Index}</td>
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
            viewAddComponentData={viewAddComponentData}
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
            onClick={SetViewAdd}
          >
            Add component
          </Button>
        </div>
      )}
    </Row>
  );
};
export default Database;
