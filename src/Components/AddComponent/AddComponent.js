import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTemplate from "../../Hooks/useTemplate";
import useDatabaseProjects from "../../Hooks/useDatabaseProject";

const AddComponent = ({ databaseFiltered, Database }) => {
  console.log("Database from ADDComponent", databaseFiltered);

  const [viewComponents, setViewComponents] = useState("Select Component Name");
  const [selectedColor, SetSelectedColor] = useState("");
  const [componentData, setComponentData] = useState();
  const [viewDropDownComponents, setViewDropDownComponents] = useState(false);
  const [isTemplate, setIsTemplate] = useState(false);

  const [templateUpdate, setTemplateUpdate] = useState([]);
  const [componentColor, setComponentColor] = useState("");

  const [viewCustomCpk, setViewCustomCpk] = useState(false);
  const { templates } = useTemplate();
  const { addNewDim, removeDim } = useDatabaseProjects();

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

  console.log("Is templates?:", templateUpdate);

  const [form, setForm] = useState({
    Name: "",
    Description: "",
    DrwNr: "",
    NominalValue: "",
    UpperTolerance: "",
    LowerTolerance: "",
    DistributionType: "",
    ToleranceType: "",
    Samples: "",
    Color: "",
    Sign: "",
  });

  useEffect(() => {
    TemplateComponentFiltered();
  }, [databaseFiltered]);

  useEffect(() => {
    templateIsUpdate();
  }, [templates]);

  const templateIsUpdate = () => {
    if (templates.length > 0) {
      setTemplateUpdate(templates);
    }
  };

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
  console.log("componentData", componentData);

  // const TemplateDatabaseFilter = (e) => {
  //   if (
  //     e.target.value !== "New Component" &&
  //     e.target.value !== "Name of component"
  //   ) {
  //     console.log("e", e.target.value);

  //     const index = componentData[0].Data.findIndex(
  //       (x) => x.ComponentName === e.target.value
  //     );
  //     // console.log("index", index);

  //     SetSelectedColor(componentData[0].Data[index].Color);

  //     // setTemplateSelected(true);
  //     // setViewAddTemplateName(false);
  //   } else {
  //     console.log("New component selected");
  //     // setTemplateSelected(false);
  //     // setViewAddTemplateName(true);
  //     // setViewSelectTemplate(false);
  //     // setSelectTemplate("Select template name");
  //   }
  // };

  const handleSelectTemplate = (e) => {
    console.log("e from handleSelecttemplate:", e);
    setViewComponents(e);
    filterColor(e);
    const test = e;

    setForm({ ...form, Name: test });
  };

  const filterColor = (e) => {
    const obj = componentData[0].Data.find((o) => o.ComponentName === e);
    const index = componentData[0].Data.indexOf(obj);
    const color = componentData[0].Data[index].Color;

    const testcolor = color.toLowerCase();
    console.log("Color from filterColor", testcolor);
    setForm({ ...form, Color: testcolor });
  };
  console.log("AddComponent form", form);

  console.log("AddComponent Template name:", viewComponents);
  const handleCustomCpK = (e) => {
    if (e.target.value === "Normal Cpk Custom") {
      setViewCustomCpk(true);
      console.log("Normal Cpk Custom");
    } else {
      setViewCustomCpk(false);
    }
  };

  const AddComponent = (e) => {
    e.preventDefault();
    console.log("form", form);
    setViewCustomCpk(false);

    if (
      form.Name !== "" &&
      form.Name !== "Select Component" &&
      form.Description !== "" &&
      form.DrwNr !== "" &&
      form.NominalValue !== "" &&
      form.UpperTolerance !== "" &&
      form.LowerTolerance !== "" &&
      form.DistributionType !== "" &&
      form.DistributionType !== "Distribution type" &&
      form.ToleranceType !== "" &&
      form.ToleranceType !== "" &&
      form.Samples !== "" &&
      form.Sign !== ""
    ) {
      console.log("Database", databaseFiltered[0].ProjectName);
      const index = Database.findIndex(
        (x) => x.ProjectName === databaseFiltered[0].ProjectName
      );
      console.log("index", index);
      const lastID = Math.max(
        ...Database[index].DatabaseDim.map((o) => o.Index)
      );
      let newID = 0;
      if (lastID === -Infinity) {
        newID = 1;
      } else {
        newID = lastID + 1;
      }

      const id = index + 1;
      console.log("lastID", lastID);
      const nComponent = {
        Index: newID,
        Name: form.Name,
        Description: form.Description,
        UniqueIdentifier: `D${newID}`,
        DrwNr: form.DrwNr,
        NominalValue: Number(form.NominalValue),
        UpperTolerance: Number(form.UpperTolerance),
        LowerTolerance: Number(form.LowerTolerance),
        DistributionType: form.DistributionType,
        ToleranceType: form.ToleranceType,
        Samples: Number(form.Samples),
        Sign: form.Sign,
      };

      addNewDim(id, nComponent);

      Database[index].DatabaseDim.push(nComponent);

      console.log("Database Updated", Database);

      resetButton();

      // Database.push({
      //   ProjectName: databaseAdd[0].ProjectName,
      //   TemplateName: databaseAdd[0].TemplateName,
      //   Data: [
      //     {
      //       Index: 1,
      //       Name: form.Name,
      //       Description: form.Description,
      //       UniqueIdentifier: "test",
      //       DrwNr: form.DrwNr,
      //       NominalValue: form.NominalValue,
      //       UpperTolerance: form.UpperTolerance,
      //       LowerTolerance: form.LowerTolerance,
      //       DistributionType: form.DistributionType,
      //       ToleranceType: form.ToleranceType,
      //     },
      //   ],
      // });
    } else {
      toast("Add all informations!", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    }
  };

  console.log("Database", Database);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submited:", e);
  };

  const handleChange = (e) => {
    // console.log("event", e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const submitButton = (e) => {
    e.preventDefault();
    console.log(form);
    setViewCustomCpk(false);
    resetButton();
  };
  const resetButton = () => {
    setForm({
      Name: "",
      Description: "",
      DrwNr: "",
      NominalValue: "",
      UpperTolerance: "",
      LowerTolerance: "",
      DistributionType: "",
      ToleranceType: "",
      Samples: "",
    });
  };

  return (
    <>
      <p className="fs-3 border border-success-subtle p-2 rounded">
        Add Component
      </p>
      <p className="fs-4 border border-success-subtle p-2 rounded">
        Project Name:{databaseFiltered[0].ProjectName}
      </p>
      <Form className="p-2" onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Row>
              <Col>
                {isTemplate && (
                  <Form.Group
                    controlId="formGridState"
                    className="col col-sm-6"
                  >
                    <Form.Label>Select Component</Form.Label>
                    <DropdownButton
                      title={viewComponents}
                      // defaultValue="Select Component"
                      // className="form-control"
                      // name="Name"
                      // value={form.Name}
                      onSelect={(e) => {
                        // handleChange(e);
                        // TemplateDatabaseFilter(e);
                        handleSelectTemplate(e);
                      }}
                    >
                      {/* <option value="Select Component">Select Component</option> */}
                      {componentData[0].Data.map((n) => (
                        <Dropdown.Item
                          eventKey={n.ComponentName}
                          key={n.ComponentName}
                        >
                          {n.ComponentName}
                        </Dropdown.Item>
                        // <option value={n.TemplateName}>{n.TemplateName}</option>
                      ))}
                      {/* <option value="New Component">New Component</option> */}
                    </DropdownButton>
                  </Form.Group>
                )}
              </Col>
              <Col>
                <p>Color </p>
                <div
                  style={{
                    display: "inline-block",
                    width: "20px", // Adjust the width of the rectangle as needed
                    height: "20px", // Adjust the height of the rectangle as needed
                    backgroundColor: form.Color,
                    marginLeft: "10px", // Add some spacing between the paragraph and the rectangle
                  }}
                ></div>
              </Col>
            </Row>
            <ToastContainer transition={Bounce} autoClose={2000} />
            <Row className="mb-3">
              <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="description"
                  name="Description"
                  placeholder="Enter description"
                  value={form.Description}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                <Form.Label>Drawing number</Form.Label>
                <Form.Control
                  type="name"
                  name="DrwNr"
                  placeholder="Enter drawing number"
                  value={form.DrwNr}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Group>
            </Row>
            {/* <Row className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  onChange={(e) => handleComponentDescripion(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Drw. nr.</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter drawing number"
                  onChange={handleDrwNr}
                />
              </Form.Group>
            </Row> */}

            <Row className="mb-3">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Nominal Value</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter nominal value"
                    name="NominalValue"
                    value={form.NominalValue}
                    onChange={handleChange}
                    className="form-control"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Upper Limit</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter upper limit"
                    name="UpperTolerance"
                    value={form.UpperTolerance}
                    onChange={handleChange}
                    className="form-control"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Lower Limit</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter lower Limit"
                    name="LowerTolerance"
                    value={form.LowerTolerance}
                    onChange={handleChange}
                    className="form-control"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formGridState" className="col col-sm-6">
                  <Form.Label>Select tolerance type</Form.Label>
                  <Form.Select
                    defaultValue="Select tolerance"
                    className="form-control"
                    name="ToleranceType"
                    value={form.ToleranceType}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="Select tolerance">Select tolerance</option>
                    <option value="General Tolerance">General Tolerance</option>
                    <option value="Imposed Tolerance">Imposed Tolerance</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formGridState" className="col col-sm-6">
                  <Form.Label>Select distribution type</Form.Label>
                  <Form.Select
                    defaultValue="Distribution type"
                    className="form-control"
                    name="DistributionType"
                    value={form.DistributionType}
                    onChange={(e) => {
                      handleChange(e);
                      handleCustomCpK(e);
                    }}
                  >
                    <option value="Distribution type">Distribution type</option>
                    <option value="Normal Cpk 1">Normal Cpk 1</option>
                    <option value="Normal Cpk 1.33">Normal Cpk 1.33</option>
                    <option value="Normal Cpk 1.66">Normal Cpk 1.66</option>
                    <option value="Normal Cpk 2">Normal Cpk 2</option>
                    <option value="Uniform">Uniform</option>
                    <option value="Normal Cpk Custom">Normal Cpk Custom</option>
                  </Form.Select>
                </Form.Group>
                {viewCustomCpk && (
                  <Row className="col col-sm-6">
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control
                        type="text"
                        placeholder="Enter Cpk"
                        name="DistributionType"
                        // value={form.DistributionType}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                )}
              </Col>
              <Col>
                <Form.Group controlId="formGridState" className="col col-sm-6">
                  <Form.Label>Select Sign</Form.Label>
                  <Form.Select
                    defaultValue="Select Sign"
                    className="form-control"
                    name="Sign"
                    value={form.Sign}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="+">+</option>
                    <option value="-">-</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Samples</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter number of samples"
                    name="Samples"
                    value={form.Samples}
                    onChange={handleChange}
                    className="form-control"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* <DropdownButton
              title={selectToleranceType}
              onSelect={(e) => {
                handleSelectToleranceType(e);
              }}
              variant="secondary"
            >
              <Dropdown.Item
                eventKey={"General Tolerance"}
                key={"General Tolerance"}
              >
                General Tolerance
              </Dropdown.Item>
              <Dropdown.Item
                eventKey={"Imposed Tolerance"}
                key={"Imposed Tolerance"}
              >
                Imposed Tolerance
              </Dropdown.Item>
            </DropdownButton>
            <Dropdown
              onSelect={(e) => {
                handleDistributionType(e);
                handleCustomCpK(e);
              }}
            >
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {distributionType}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey={"Normal Cpk 1"} key={"Normal Cpk 1"}>
                  Normal Cpk 1
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey={"Normal Cpk 1.33"}
                  key={"Normal Cpk 1.33t"}
                >
                  Normal Cpk 1.33
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey={"Normal Cpk 1.66"}
                  key={"Normal Cpk 1.66t"}
                >
                  Normal Cpk 1.66
                </Dropdown.Item>
                <Dropdown.Item eventKey={"Normal Cpk 2"} key={"Normal Cpk 2"}>
                  Normal Cpk 2
                </Dropdown.Item>

                <Dropdown.Item eventKey={"Uniform"} key={"Uniform"}>
                  Uniform
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey={"Normal Cpk Custom"}
                  key={"Normal Cpk Custom"}
                >
                  Normal Cpk Custom
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button
            variant="secondary"
            type="submit"
            className="px-2"
            onClick={(e) => AddComponent(e)}
          >
            Add
          </Button>
        </div>
        {/* <Row className="mb-3">
          <Form.Group controlId="formGridCheckbox" className="col col-sm-6">
            <button
              type="submit"
              onClick={submitButton}
              className="me-4 btn btn-success btn-lg btn-block"
            >
              Submit
            </button>
            <button
              type="reset"
              onClick={resetButton}
              className="me-4 btn btn-danger btn-lg btn-block"
            >
              Cancel
            </button>
          </Form.Group>
        </Row> */}
      </Form>
    </>
  );
};

export default AddComponent;
