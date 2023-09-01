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

const AddComponent = ({
  databaseFiltered,
  Database,
  setDatabaseUpdate,
  isTemplate,
  componentData,
}) => {
  console.log("Database from ADDComponent", databaseFiltered);

  const [viewComponents, setViewComponents] = useState("Select Component Name");

  const [viewCustomCpk, setViewCustomCpk] = useState(false);

  const { addNewDim } = useDatabaseProjects();

  console.log("Is templates?:", isTemplate);

  const [form, setForm] = useState({
    Name: "",
    Description: "",
    DrwNr: "",
    NominalValue: "",
    UpperTolerance: "",
    LowerTolerance: "",
    DistributionType: "",
    ToleranceType: "",
    Color: "",
    Sign: "",
  });

  console.log("componentData", componentData);

  const handleSelectTemplate = (e) => {
    console.log("e from handleSelectTemplate:", e);
    setViewComponents(e);
    filterColor(e);

    setForm((prevForm) => ({
      ...prevForm,
      Name: e,
    }));
  };

  const filterColor = (e) => {
    const obj = componentData[0].Data.find((o) => o.ComponentName === e);
    const index = componentData[0].Data.indexOf(obj);
    const color = componentData[0].Data[index].Color;
    const testcolor = color.toLowerCase();
    console.log("Color from filterColor", testcolor);

    setForm((prevForm) => ({
      ...prevForm,
      Color: testcolor,
    }));
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
      form.ToleranceType !== "Select tolerance" &&
      form.Sign !== "" &&
      form.Sign !== "Select Sign" &&
      form.Color !== "" &&
      form.DrwNr !== ""
    ) {
      console.log("Database", databaseFiltered[0].ProjectName);
      const index = Database.findIndex(
        (x) => x.ProjectName === databaseFiltered[0].ProjectName
      );
      console.log("index", index);
      const lastID = Math.max(...Database[index].DatabaseDim.map((o) => o.ID));
      let newID = 0;
      if (lastID === -Infinity) {
        newID = 1;
      } else {
        newID = lastID + 1;
      }

      const id = index + 1;
      console.log("lastID", lastID);
      const nComponent = {
        ID: newID,
        Name: form.Name,
        Description: form.Description,
        UniqueIdentifier: `D${newID}`,
        NominalValue: Number(form.NominalValue),
        UpperTolerance: Number(form.UpperTolerance),
        LowerTolerance: Number(form.LowerTolerance),
        Sign: form.Sign,
        DistributionType: form.DistributionType,
        ToleranceType: form.ToleranceType,
        Color: form.Color,
        DrwNr: form.DrwNr,
      };

      addNewDim(id, nComponent);

      Database[index].DatabaseDim.push(nComponent);
      setDatabaseUpdate([...Database]); // Trigger a shallow copy to notify changes

      console.log("Database Updated", Database);

      resetButton();
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
      Color: "",
      Sign: "",
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
                      onSelect={(e) => {
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
                    width: "40px", // Adjust the width of the rectangle as needed
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
                    <option value="Select Sign">Select Sign</option>
                    <option value="+">+</option>
                    <option value="-">-</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
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
      </Form>
    </>
  );
};

export default AddComponent;
