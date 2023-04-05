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

const AddComponent = ({ databaseFiltered, Database }) => {
  console.log("Database from ADDComponent", databaseFiltered);

  const [viewComponents, setViewComponents] = useState("Name of component");
  const [selectedColor, SetSelectedColor] = useState("");
  const [databaseAdd, setdatabaseAdd] = useState(databaseFiltered);
  const [componentData, setComponentData] = useState([]);
  const [viewDropDownComponents, setViewDropDownComponents] = useState(false);

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

  const [form, setForm] = useState({
    Name: "",
    DrwNr: "",
    NominalValue: "",
    UpperTolerance: "",
    LowerTolerance: "",
    DistributionType: "",
    ToleranceType: "",
    Samples: "",
  });

  useEffect(() => {
    TemplateComponentFiltered();
  }, [databaseFiltered]);

  const TemplateComponentFiltered = () => {
    const TemplateN = databaseFiltered[0].TemplateName;
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
    resetButton();
    if (
      form.Name !== "" &&
      form.DrwNr !== "" &&
      form.NominalValue !== "" &&
      form.UpperTolerance !== "" &&
      form.LowerTolerance !== "" &&
      form.DistributionType !== "" &&
      form.ToleranceType !== "" &&
      form.Samples !== ""
      // componentDescription !== "" &&
      // drwNr !== "" &&
      // nominalVal !== "" &&
      // upperlimit !== "" &&
      // lowerlimit !== "" &&
      // distributionType !== "Select distribution type" &&
      // selectToleranceType !== "Select distribution type"
    ) {
      Database.push({
        ProjectName: databaseAdd[0].ProjectName,
        TemplateName: databaseAdd[0].TemplateName,
        Data: [
          {
            Index: 1,
            Name: form.Name,
            UniqueIdentifier: "test",
            DrwNr: form.DrwNr,
            NominalValue: form.NominalValue,
            UpperTolerance: form.UpperTolerance,
            LowerTolerance: form.LowerTolerance,
            DistributionType: form.DistributionType,
            ToleranceType: form.ToleranceType,
          },
        ],
      });
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
        Project Name:{databaseAdd[0].ProjectName}
      </p>
      <Form className="p-2" onSubmit={handleSubmit}>
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
            <ToastContainer transition={Bounce} autoClose={2000} />
            <Row className="mb-3">
              <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="description"
                  name="Name"
                  placeholder="Enter description"
                  value={form.Name}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                <Form.Label>Last Name</Form.Label>
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
              <Form.Group controlId="formGridState" className="col col-sm-6">
                <Form.Label>Select tolerance type</Form.Label>
                <Form.Select
                  defaultValue="General Tolerance"
                  className="form-control"
                  name="ToleranceType"
                  value={form.ToleranceType}
                  onChange={handleChange}
                >
                  <option value="General Tolerance">General Tolerance</option>
                  <option value="Imposed Tolerance">Imposed Tolerance</option>
                </Form.Select>
              </Form.Group>
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
        <div className="d-flex justify-content-between">
          <Button
            variant="secondary"
            type="submit"
            className="px-2"
            onClick={(e) => AddComponent(e)}
          >
            Add
          </Button>
          <Button variant="danger" type="submit" className="px-2">
            Cancel
          </Button>
        </div>
        <Row className="mb-3">
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
        </Row>
      </Form>

      {/* form example */}

      <form className="container mt-3 mb-3">
        <Row className="mb-3">
          <Form.Group controlId="formBasicEmail" className="col col-sm-6">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="name"
              name="first_name"
              value="{form.first_name}"
              onChange="{handleChange}"
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className="col col-sm-6">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="name"
              name="last_name"
              value="{form.last_name}"
              onChange="{handleChange}"
              className="form-control"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="formBasicMobile" className="col col-sm-6">
            <Form.Label>Mobile Number</Form.Label>
            <InputGroup>
              <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
              <Form.Control
                aria-label="Mobile Number"
                type="mobile"
                aria-describedby="basic-addon1"
                className="form-control"
                name="mobile"
                value="{form.mobile}"
                onChange="{handleChange}"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className="col col-sm-6">
            <Form.Label>Email</Form.Label>
            <InputGroup>
              <Form.Control
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                type="email"
                name="email"
                value="{form.email}"
                onChange="{handleChange}"
              />
              <InputGroup.Text id="basic-addon2">@gmail.com</InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className=" col col-sm-6" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              name="address1"
              value="{form.address1}"
              onChange="{handleChange}"
            />
          </Form.Group>
          <Form.Group className="col col-sm-6" controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              className="form-control"
              name="address2"
              value="{form.address2}"
              onChange="{handleChange}"
              type="text"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="formGridCity" className="col col-sm-4">
            <Form.Label>City</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              name="city"
              value="{form.city}"
              onChange="{handleChange}"
            />
          </Form.Group>
          <Form.Group controlId="formGridState" className="col col-sm-4">
            <Form.Label>State</Form.Label>
            <Form.Select
              defaultValue="Choose..."
              className="form-control"
              name="a_state"
              value="{form.a_state}"
              onChange="{handleChange}"
            >
              <option value="Choose...">Choose...</option>
              <option value="Delhi">Delhi</option>
              <option value="Bombay">Bommbay</option>
              <option value="New York">New York</option>
              <option value="Kashmir">Kashmir</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formGridpin" className="col col-sm-4">
            <Form.Label>Pin Code</Form.Label>
            <Form.Control
              className="form-control"
              type="pin"
              name="pin"
              value="{form.pin}"
              onChange="{handleChange}"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="formGridCheckbox" className="col col-sm-6">
            <Form.Label>Menu</Form.Label>
            <Form.Select
              defaultValue="Choose..."
              className="form-control"
              name="menu"
              value="{form.menu}"
              onChange="{handleChange}"
            >
              <option value="Choose...">Choose...</option>
              <option value="Veg Biryani">Veg Biryani</option>
              <option value="BBQ Chicken Wings">BBQ Chicken Wings</option>
              <option value="Rasmalai">Rasmalai</option>
              <option value="Beer">Beer</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formGridlabel" className="col col-sm-6">
            <Form.Label>Order Details</Form.Label>
            <Form.Control
              as="textarea"
              rows="{3}"
              className="form-control"
              name="order"
              value="{form.order}"
              onChange="{handleChange}"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="formGridCheckbox" className="col col-sm-6">
            <button
              type="submit"
              onClick="{submitButton}"
              className="me-4 btn btn-success btn-lg btn-block"
            >
              Submit
            </button>
            <button
              type="reset"
              onClick="{resetButton}"
              className="me-4 btn btn-danger btn-lg btn-block"
            >
              Cancel
            </button>
          </Form.Group>
        </Row>
      </form>
    </>
  );
};

export default AddComponent;
