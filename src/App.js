import "./App.css";
// import AddComponent from "./Components/AddComponent/AddComponent";
import Case from "./Components/Case/Case";
import Database from "./Components/Database/Database";
import Summary from "./Components/Summary/Summary";
import Template from "./Components/Template/Template";
// import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState, useEffect } from "react";
import SideNav from "./Components/Nav/SideNav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NaviBar from "./Components/Nav/NaviBar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useBetween } from "use-between";
import useDatabaseProjects from "./Hooks/useDatabaseProject";

const useShareableState = () => {
  const [databaseSummryFiltered, setDatabaseSummryFiltered] = useState([]);
  const [projectSelected, setProjectSelected] = useState(false);
  return {
    databaseSummryFiltered,
    setDatabaseSummryFiltered,
    projectSelected,
    setProjectSelected,
  };
};
export const useSharable = () => useBetween(useShareableState);

function App() {
  const [selectProject, setSelectproject] = useState("Select project name");
  const [isMinSize2, setIsMinSize2] = useState(true);
  const [viewAddTemplate, setViewAddTemplate] = useState(false);
  // const [databaseSummryFiltered, setDatabaseSummryFiltered] = useState([]);
  // const [projectSelected, setProjectSelected] = useState(false);
  const [newProject, setNewProject] = useState(false);
  const [viewAddCase, setViewAddCase] = useState(false);
  const [caseDescription, setCaseDescription] = useState("");
  const {
    databaseSummryFiltered,
    setDatabaseSummryFiltered,
    projectSelected,
    setProjectSelected,
  } = useBetween(useShareableState);

  const databaseTest = useDatabaseProjects();

  const DatabaseProject = [
    {
      ProjectName: "Test Name1",
      TemplateName: "Test Template1",
      DataCase: [
        {
          ID: 1,
          CaseName: "Case1",
          Description: "Gap housing-cover",
          Author: "Alex",
          Date: "Data",
          CaseData: [
            {
              ID: 1,
              Name: "Housing",
              Description: "Dim1",
              UniqueIdentifier: "D1",
              NominalValue: 7.7,
              UpperTolerance: 0.05,
              LowerTolerance: -0.05,
              Sign: "+",
              DistributionType: "Normal Cpk 1.33",
              ToleranceType: "General Tol.",
              Influence: "40",
              Formula: "",
            },
            {
              ID: 2,
              Name: "Cover",
              Description: "Dim2",
              UniqueIdentifier: "D2",
              NominalValue: 0,
              UpperTolerance: 0.1,
              LowerTolerance: -0.1,
              Sign: "-",
              DistributionType: "Normal Cpk 1.33",
              ToleranceType: "General Tol.",
              Influence: 30,
              Formula: "",
            },
            {
              ID: 3,
              Name: "Connector",
              Description: "Dim3",
              UniqueIdentifier: "D3",
              NominalValue: 8.2,
              UpperTolerance: 0.06,
              LowerTolerance: -0.06,
              Sign: "-",
              DistributionType: "Normal Cpk 1.66",
              ToleranceType: "General Tol.",
              Influence: 30,
              Formula: "",
            },
            {
              ID: 4,
              Name: "Connector",
              Description: "Dim4",
              UniqueIdentifier: "D4",
              NominalValue: 8.2,
              UpperTolerance: 0.075,
              LowerTolerance: -0.075,
              Sign: "+",
              DistributionType: "Normal Cpk 1.33",
              ToleranceType: "General Tol.",
              Influence: 30,
              Formula: "",
            },
            {
              ID: 5,
              Name: "Connector",
              Description: "Dim5",
              UniqueIdentifier: "D5",
              NominalValue: 0,
              UpperTolerance: 0.15,
              LowerTolerance: -0.15,
              Sign: "+",
              DistributionType: "Normal Cpk 1.66",
              ToleranceType: "General Tol.",
              Influence: 30,
              Formula: "",
            },
            {
              ID: 6,
              Name: "Connector",
              Description: "Dim6",
              UniqueIdentifier: "D6",
              NominalValue: 7,
              UpperTolerance: 0.05,
              LowerTolerance: -0.05,
              Sign: "-",
              DistributionType: "Normal Cpk 1.33",
              ToleranceType: "General Tol.",
              Influence: 30,
              Formula: "",
            },
          ],
        },
        {
          ID: 2,
          CaseName: "Case2",
          Description: "Gap housing-PCB",
          Author: "Alex",
          Date: "Data",
          CaseData: [
            {
              ID: 4,
              Name: "Housing2",
              Description: "Dim1",
              UniqueIdentifier: "D1",
              NominalValue: 6,
              UpperTolerance: 0.4,
              LowerTolerance: -0.4,
              Sign: "-",
              DistributionType: "Normal Cpk 1.66",
              ToleranceType: "General Tol.",
              Influence: "40",
              Formula: "",
            },
            {
              ID: 2,
              Name: "Cover2",
              Description: "Dim2",
              UniqueIdentifier: "D2",
              NominalValue: 6,
              UpperTolerance: 1,
              LowerTolerance: -1,
              Sign: "+",
              DistributionType: "Normal Cpk 1.33",
              ToleranceType: "General Tol.",
              Influence: 30,
              Formula: "",
            },
            {
              ID: 3,
              Name: "Connector3",
              Description: "Dim3",
              UniqueIdentifier: "D3",
              NominalValue: 16,
              UpperTolerance: 0.2,
              LowerTolerance: -0.2,
              Sign: "+",
              DistributionType: "Normal Cpk 1.66",
              ToleranceType: "General Tol.",
              Influence: 30,
              Formula: "",
            },
          ],
        },
        {
          ID: 3,
          CaseName: "Case3",
          Description: "Gap PCB-cover",
          Author: "Alex",
          Date: "Data",
        },
      ],
      DatabaseDim: [
        {
          ID: 1,
          Name: "Housing",
          Description: "Dim1",
          UniqueIdentifier: "D1",
          NominalValue: 7.7,
          UpperTolerance: 0.05,
          LowerTolerance: -0.05,
          Sign: "+",
          DistributionType: "Normal Cpk 1.33",
          ToleranceType: "General Tol.",
          Influence: "40",
          Formula: "",
        },
        {
          ID: 2,
          Name: "Cover",
          Description: "Dim2",
          UniqueIdentifier: "D2",
          NominalValue: 0,
          UpperTolerance: 0.1,
          LowerTolerance: -0.1,
          Sign: "-",
          DistributionType: "Normal Cpk 1.33",
          ToleranceType: "General Tol.",
          Influence: 30,
          Formula: "",
        },
        {
          ID: 3,
          Name: "Connector",
          Description: "Dim3",
          UniqueIdentifier: "D3",
          NominalValue: 8.2,
          UpperTolerance: 0.06,
          LowerTolerance: -0.06,
          Sign: "-",
          DistributionType: "Normal Cpk 1.66",
          ToleranceType: "General Tol.",
          Influence: 30,
          Formula: "",
        },
        {
          ID: 4,
          Name: "Connector",
          Description: "Dim4",
          UniqueIdentifier: "D4",
          NominalValue: 8.2,
          UpperTolerance: 0.075,
          LowerTolerance: -0.075,
          Sign: "+",
          DistributionType: "Normal Cpk 1.33",
          ToleranceType: "General Tol.",
          Influence: 30,
          Formula: "",
        },
        {
          ID: 5,
          Name: "Connector",
          Description: "Dim5",
          UniqueIdentifier: "D5",
          NominalValue: 0,
          UpperTolerance: 0.15,
          LowerTolerance: -0.15,
          Sign: "+",
          DistributionType: "Normal Cpk 1.66",
          ToleranceType: "General Tol.",
          Influence: 30,
          Formula: "",
        },
        {
          ID: 6,
          Name: "Connector",
          Description: "Dim6",
          UniqueIdentifier: "D6",
          NominalValue: 7,
          UpperTolerance: 0.05,
          LowerTolerance: -0.05,
          Sign: "-",
          DistributionType: "Normal Cpk 1.33",
          ToleranceType: "General Tol.",
          Influence: 30,
          Formula: "",
        },
      ],
    },
    {
      ProjectName: "Test Name2",
      TemplateName: "Test Template2",
      DataCase: [
        {
          ID: 1,
          CaseName: "Case1",
          Description: "Gap housing-cover",
          Author: "Alex",
          Date: "Data",
        },
        {
          ID: 2,
          CaseName: "Case2",
          Description: "Gap housing-PCB",
          Author: "Alex",
          Date: "Data",
        },
        {
          ID: 3,
          CaseName: "Case3",
          Description: "Gap PCB-cover",
          Author: "Alex",
          Date: "Data",
        },
      ],
    },
    {
      ProjectName: "Test Name3",
      TemplateName: "Test Template3",
      DataCase: [
        {
          ID: 1,
          CaseName: "Case1",
          Description: "Gap housing-cover",
          Author: "Alex",
          Date: "Data",
        },
        {
          ID: 2,
          CaseName: "Case2",
          Description: "Gap housing-PCB",
          Author: "Alex",
          Date: "Data",
        },
        {
          ID: 3,
          CaseName: "Case3",
          Description: "Gap PCB-cover",
          Author: "Alex",
          Date: "Data",
        },
      ],
    },
  ];

  const [databaseSummryUpdate, setDatabaseSummryUpdate] =
    useState(databaseTest);

  useEffect(() => {
    setDatabaseSummryUpdate(databaseTest);
  });

  const handleResize2 = () => {
    if (window.innerWidth > 770) {
      setIsMinSize2(true);

      // console.log(window.innerWidth);
    } else {
      setIsMinSize2(false);
      // console.log(window.innerWidth);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize2);
  });

  const NewTemplate = (e) => {
    if (e === "New Template") {
      setViewAddTemplate(true);
    }
  };
  const handleSelectProjectname = (e) => {
    setSelectproject(e);
  };

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

  if (databaseTest.length > 0) {
    console.log("databaseTest input:", databaseTest[5]);
  } else {
    console.log("databaseTest is empty");
  }

  return (
    <>
      <Row>
        <Col className="col-0  col-md-3 col-lg-2 col-xl-2 p-2 sticky-top ">
          {isMinSize2 && <SideNav />}
        </Col>
        <Col className="col-12  col-md-9 col-lg-10 p-2 col-xl-10 ">
          <Row className="sticky-top p-4">
            <NaviBar isMinSize2={isMinSize2} />
          </Row>
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
          <Row className="p-4">
            <Summary
              NewTemplate={NewTemplate}
              databaseSummryFiltered={databaseSummryFiltered}
            />
            {viewAddTemplate && <Template />}
            <Database />
            {/* <AddComponent /> */}
            <Case />
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default App;
