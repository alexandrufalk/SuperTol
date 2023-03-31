import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddComponent = ({ Database }) => {
  console.log("Database from ADDComponent", Database);

  const [viewComponents, setViewComponents] = useState("Name of component");
  const [selectedColor, SetSelectedColor] = useState("");
  const [databaseAdd, setdatabaseAdd] = useState(Database);
  const [componentData, setComponentData] = useState([]);
  const [viewDropDownComponents, setViewDropDownComponents] = useState(false);
  const [componentDescription, setComponentDescription] = useState("");
  const [drwNr, setDrwNr] = useState("");
  const [nominalVal, setNominalVal] = useState("");
  const [upperlimit, setUpperlimit] = useState("");
  const [lowerlimit, setLowerlimit] = useState("");
  const [numberOfsamples, setNumberOfSamples] = useState("");
  const [selectToleranceType, setSelectToleranceType] = useState(
    "Select tolerance type"
  );
  const [distributionType, setSelectDistributionType] = useState(
    "Select distribution type"
  );
  const [viewCustomCpk, setViewCustomCpk] = useState(false);
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

  useEffect(() => {
    TemplateComponentFiltered();
  }, [Database]);

  const TemplateComponentFiltered = () => {
    const TemplateN = Database[0].TemplateName;
    console.log("TemplateN", TemplateN);
    setComponentData(
      DatabaseTemplateName.filter((data) => data.TemplateName === TemplateN)
    );
    setViewDropDownComponents(true);
  };
  console.log("componentData", componentData);

  const TemplateDatabaseFilter = (e) => {
    if (e !== "New Component" && e !== "Name of component") {
      console.log("e", e);
      console.log(componentData[0].Data);
      const index = componentData[0].Data.findIndex(
        (x) => x.ComponentName === e
      );
      // console.log("index", index);

      SetSelectedColor(componentData[0].Data[index].Color);

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

  const handleSelectTemplate = (e) => {
    setViewComponents(e);
  };
  const handleComponentDescripion = (e) => {
    setComponentDescription(e.target.value);
  };
  const handleDrwNr = (e) => {
    setDrwNr(e.target.value);
  };
  const handleNominalVal = (e) => {
    setNominalVal(e.target.value);
  };
  const handleUpperlimit = (e) => {
    setUpperlimit(e.target.value);
  };
  const handleLowerlimit = (e) => {
    setLowerlimit(e.target.value);
  };
  const handleNumberOfSamples = (e) => {
    setNumberOfSamples(e.target.value);
  };
  const handleSelectToleranceType = (e) => {
    setSelectToleranceType(e);
  };

  const handleDistributionType = (e) => {
    setSelectDistributionType(e);
  };
  const handleCustomCpK = (e) => {
    if (e === "Normal Cpk Custom") {
      setViewCustomCpk(true);
      console.log("Normal Cpk Custom");
    }
  };
  const handleCustomCpKValue = (e) => {
    if (e !== "Enter Cpk" && e !== "") {
      setSelectDistributionType(e.target.value);
    } else {
      toast("Enter Cpk value", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <p className="fs-3 border border-success-subtle p-2 rounded">
        Add Component
      </p>
      <p className="fs-4 border border-success-subtle p-2 rounded">
        Project Name:{databaseAdd[0].ProjectName}
      </p>
      <Form className="p-2">
        <Row>
          <Col>
            <Row>
              <Col>
                {viewDropDownComponents && (
                  <DropdownButton
                    title={viewComponents}
                    onSelect={(e) => {
                      TemplateDatabaseFilter(e);
                      handleSelectTemplate(e);
                    }}
                    variant="secondary"
                  >
                    {/* <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      {projectTemplate}
                    </Dropdown.Toggle> */}

                    {componentData[0].Data.map((n) => (
                      <Dropdown.Item
                        eventKey={n.ComponentName}
                        key={n.ComponentName}
                      >
                        {n.ComponentName}
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Item
                      eventKey={"New Template"}
                      key={"New Template"}
                    >
                      New Component
                    </Dropdown.Item>
                  </DropdownButton>
                )}
              </Col>
              <Col>
                <p>Color {selectedColor}</p>
              </Col>
            </Row>

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
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Nominal Value</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter nominal value"
                    onChange={handleNominalVal}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Upper Limit</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter upper limit"
                    onChange={handleUpperlimit}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Lower Limit</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter lower Limit"
                    onChange={handleLowerlimit}
                  />
                </Form.Group>
              </Col>
            </Row>

            <DropdownButton
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
            </Dropdown>
            {viewCustomCpk && (
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="text"
                  placeholder="Enter Cpk"
                  onChange={(e) => handleCustomCpKValue(e)}
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Samples</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter number of samples"
                onChange={(e) => handleNumberOfSamples(e)}
              />
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
