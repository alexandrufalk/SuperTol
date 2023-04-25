import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import {
  // VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryHistogram,
  VictoryLine,
} from "victory";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/esm/Button";
import Canvas from "../Canvas/Canvas";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
// import Canvas2 from "../Canvas/Canvas2";
import "./case.css";

const Case = () => {
  const [histData, setHistData] = useState([]);
  const [histBinData, setHistBinData] = useState([]);
  const [pdfData, setPdfData] = useState([]);
  const [addComponent, setAddComponent] = useState("Select Component");
  const [meanStatistic, setMeanStatistic] = useState("");

  const DatabaseCases = [
    {
      ProjectName: "Test Name1",
      Data: [
        {
          CaseName: "Case1",
          CaseData: [
            {
              ID: 1,
              Name: "Housing",
              Description: "Dim1",
              UniqueIdentifier: "D1",
              NominalValue: 16,
              UpperTolerance: 0.4,
              LowerTolerance: -0.2,
              Sign: "+",
              DistributionType: "Normal Cpk 1.66",
              ToleranceType: "General Tol.",
              Influence: "40",
              Formula: "",
            },
            {
              ID: 2,
              Name: "Cover",
              Description: "Dim2",
              UniqueIdentifier: "D2",
              NominalValue: 2,
              UpperTolerance: 1,
              LowerTolerance: -1,
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
              NominalValue: 10,
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
          CaseName: "Case2",
          CaseData: [
            {
              ID: 1,
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
      ],
    },
  ];
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

  const DatabaseCalculation = DatabaseCases[0].Data[0].CaseData;

  //Worst case nominal
  const WorstCaseNominal = DatabaseCalculation.map((n) =>
    Number(
      n.Sign + (n.NominalValue + (n.LowerTolerance + n.UpperTolerance) / 2)
    )
  ).reduce((accumulator, current) => accumulator + current, 0);

  //worst case  tolerance

  const WorstCaseTolerance = DatabaseCalculation.map(
    (n) => (n.UpperTolerance - n.LowerTolerance) / 2
  ).reduce((accumulator, current) => accumulator + current, 0);
  console.log("WorstCaseNominal", WorstCaseNominal);
  console.log("WorstCaseTolerance", WorstCaseTolerance);
  console.log("DatabaseCalculation", DatabaseCalculation);
  console.log("DatabaseCases", DatabaseCases[0].Data[0].CaseData);

  console.log("histData", histData);
  console.log("histBinData", histBinData);
  console.log("pdfData", pdfData);

  //Standard  deviation calculation
  const StandardDeviation = Math.sqrt(
    DatabaseCalculation.map((n) =>
      Math.pow(
        Math.round(
          ((n.UpperTolerance - n.LowerTolerance) /
            (6 * parseFloat(n.DistributionType.replace(/[^\d.]*/g, ""))) +
            Number.EPSILON) *
            100
        ) / 100,
        2
      )
    ).reduce((accumulator, current) => accumulator + current, 0)
  );

  console.log("StandardDeviation", StandardDeviation);
  //Statistical toerance
  const statisticalTol = 6 * StandardDeviation * 1.33;

  console.log("Statistical tolerance", statisticalTol);

  const generateStatistic = () => {
    console.log("Click to genereate statistic");

    //const inputs
    const samplenum = 100000;
    const mean = 14;
    const UT = 0.1;
    const LT = -0.1;
    const Cpk = 1.33;
    const stddev =
      Math.round(((UT - LT) / (6 * Cpk) + Number.EPSILON) * 1000) / 1000;
    console.log("stddev", stddev);

    //generate random number using Box Muller Transform
    const boxMullerTransform = () => {
      const u1 = Math.random();
      const u2 = Math.random();

      const z0 =
        Math.round(
          (Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2) +
            Number.EPSILON) *
            100
        ) / 100;
      const z1 =
        Math.round(
          (Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2) +
            Number.EPSILON) *
            100
        ) / 100;
      //   console.log("z0", z0, "z1", z1);
      return { z0, z1 };
    };

    //Normal Distributed random number
    const getNormallyDistributedRandomNumber = (mean, stddev) => {
      const { z0 } = boxMullerTransform();

      return z0 * stddev + mean;
    };

    //arras/objects for chart
    const genNum = [];
    const genNumHist = [];

    for (let i = 0; i < samplenum; i += 1) {
      genNum.push(
        Math.round(getNormallyDistributedRandomNumber(mean, stddev) * 100) / 100
      );
    }

    for (let i = 0; i < samplenum; i += 1) {
      genNumHist.push({
        x: genNum[i],
      });
    }
    //Statistical calculation

    const sum = genNum.reduce((acc, i) => (acc += i));
    const count = genNum.length;
    const calculatedMean = sum / count;
    setMeanStatistic(calculatedMean);
    let stddevupp = 0;

    for (let i = 0; i < genNum.length; i += 1) {
      stddevupp = stddevupp + Math.pow(genNum[i] - calculatedMean, 2);
    }
    console.log("stddevupp", stddevupp);

    const calculatedstddev = Math.sqrt(stddevupp / (count - 1));
    console.log("calculatedstddev", calculatedstddev);

    //generate bin number array
    const histBinNum = genNum
      .filter(function (value, index, array) {
        return array.indexOf(value) === index;
      })
      .sort();

    //PDF (probability density functions ) data
    const PDFdata = [];

    for (let i = 0; i < genNum.length; i += 1) {
      PDFdata.push(
        // (1 / (stddev * Math.sqrt(2.0 * Math.PI))) *
        //   (Math.E ^ -(((genNum[i] - mean) ^ 2) / ((2 * stddev) ^ 2)))
        Math.exp(-Math.pow(genNum[i] - mean, 2) / (2 * Math.pow(stddev, 2))) /
          (stddev * Math.sqrt(2 * Math.PI))
      );
    }

    //PDF data for graph

    const PDFdataGraph = [];
    for (let i = 0; i < genNum.length; i += 1) {
      PDFdataGraph.push({ x: genNum[i], y: PDFdata[i] });
    }
    setHistData(genNumHist);
    setHistBinData(histBinNum);
    setPdfData(PDFdataGraph);
  };

  return (
    <>
      <p className="fs-3 border border-success-subtle p-2 rounded ">Case nr.</p>
      <div className="container fluid p-2">
        <button onClick={generateStatistic}>Generate Statistic</button>
      </div>
      <div className="d-flex shadow-lg p-3 mb-5 bg-body-tertiary rounded opacity-85">
        <Container fluid>
          <Row>
            <div className="containergraph ">
              <div className="boxgraph ">
                <VictoryChart domainPadding={{ x: 50, y: 25 }}>
                  <VictoryHistogram
                    style={{
                      data: {
                        fill: "#434254",
                      },
                    }}
                    data={histData}
                    bins={histBinData}
                    animate={{
                      duration: 1000,
                      onLoad: { duration: 1000 },
                    }}
                  />
                </VictoryChart>
              </div>
              <div className="boxgraph overlaygraph ">
                <VictoryChart domainPadding={{ x: 50, y: 25 }}>
                  <VictoryLine data={pdfData} />
                  <VictoryAxis
                  // style={{
                  //   axis: { stroke: "transparent" },
                  //   ticks: { stroke: "transparent" },
                  //   tickLabels: { fill: "transparent" },
                  // }}
                  // domain={{ x: [1.83, 2.2], y: [0, 9.92] }}
                  />
                </VictoryChart>
              </div>
            </div>
            {/* <Col xs={12} md={6}>
              <VictoryChart
                // adding the material theme provided with Victory
                theme={chartTheme}
                domainPadding={30}
              >
                <VictoryAxis
                  crossAxis
                  tickValues={data.dim}
                  label="Clearance [mm]"
                />
                <VictoryAxis
                  dependentAxis
                  tickFormat={(x) => `${x / 1000}k`}
                  label="Frequency [-]"
                />
                <VictoryBar
                  data={data}
                  x="dim"
                  y="frequency"
                  barRatio={1}
                  style={{
                    data: { fill: "#434254" },
                  }}
                />
              </VictoryChart>
            </Col> */}

            <Col>
              <Row>
                <Col>
                  <div className="container-fluid">
                    <h3>Worst Case</h3>
                    <ListGroup className="shadow p-3 mb-5 bg-body-tertiary rounded opacity-75">
                      <ListGroup.Item className="fs-5">
                        {`Nominal:${WorstCaseNominal}`}
                      </ListGroup.Item>
                      <ListGroup.Item>{`Upper Tolerance: ${WorstCaseTolerance}`}</ListGroup.Item>
                      <ListGroup.Item>{`Lower Tolerance: ${-WorstCaseTolerance}`}</ListGroup.Item>
                      <ListGroup.Item>{`Upper Limit: ${
                        WorstCaseNominal + WorstCaseTolerance
                      }`}</ListGroup.Item>
                      <ListGroup.Item>{`Lower Limit: ${
                        WorstCaseNominal - WorstCaseTolerance
                      }`}</ListGroup.Item>
                      <ListGroup.Item>{`Range: ${
                        2 * WorstCaseTolerance
                      }`}</ListGroup.Item>
                      <ListGroup.Item>{`Symmetric:${WorstCaseNominal} ±${WorstCaseTolerance}`}</ListGroup.Item>
                    </ListGroup>
                  </div>
                </Col>
                <Col>
                  <div className="container-fluid">
                    <h3>Statistic</h3>
                    <ListGroup className="shadow p-3 mb-5 bg-body-tertiary rounded opacity-75">
                      <ListGroup.Item className="fs-5">
                        {`Mean: ${meanStatistic}`}`
                      </ListGroup.Item>
                      <ListGroup.Item>Upper Tolerance: 1.1</ListGroup.Item>
                      <ListGroup.Item>Lower Tolerance: -1.05</ListGroup.Item>
                      <ListGroup.Item>Samples: 1000</ListGroup.Item>
                      <ListGroup.Item>Range: 2.15</ListGroup.Item>
                      <ListGroup.Item>Pp:2.17</ListGroup.Item>
                      <ListGroup.Item>Ppk:2.17</ListGroup.Item>
                      <ListGroup.Item>St.Dev[σ]</ListGroup.Item>
                      <ListGroup.Item>Sigma intv.</ListGroup.Item>
                      <ListGroup.Item>Parts less LSL </ListGroup.Item>
                      <ListGroup.Item>Parts more USL</ListGroup.Item>
                    </ListGroup>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <Row>
        <div className="container horizontal-scrollable">
          <div className="row text-center">
            <Container className="p-3">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Unique Identifier</th>
                    <th>Nominal Value</th>
                    <th>Upper Tolerance</th>
                    <th>Lower Tolerance</th>
                    <th>Sign</th>
                    <th>Distribution Type</th>
                    <th>Tolerance Type</th>
                    <th>Influence %</th>
                    <th>Formula</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {DatabaseCases[0].Data[0].CaseData.map((n) => (
                    <tr key={n.ID + "test"}>
                      <td key={n.ID + "test"}> {n.ID}</td>
                      <td key={n.Name + n.ID}> {n.Name}</td>
                      <td key={n.Description + n.ID}>{n.Description}</td>
                      <td key={n.UniqueIdentifier + n.ID}>
                        {n.UniqueIdentifier}
                      </td>
                      <td key={n.NominalValue + n.ID}> {n.NominalValue}</td>
                      <td key={n.UpperTolerance + n.ID}> {n.UpperTolerance}</td>
                      <td key={n.LowerTolerance + n.ID}> {n.LowerTolerance}</td>
                      <td key={n.Sign + n.ID}> {n.Sign}</td>
                      <td key={n.DistributionType + n.ID}>
                        {" "}
                        {n.DistributionType}
                      </td>
                      <td key={n.ToleranceType + n.ID}> {n.ToleranceType}</td>
                      <td key={n.Influence + n.ID}>
                        {" "}
                        {Math.round(
                          ((((n.UpperTolerance - n.LowerTolerance) / 2) * 100) /
                            WorstCaseTolerance +
                            Number.EPSILON) *
                            100
                        ) / 100}
                      </td>
                      <td key={n.Formula + n.ID}> {n.Formula}</td>
                      <td key={n.Index + "Remove"}>
                        <Button
                          type="button"
                          variant="outline-danger"
                          // onClick={() => {
                          //   RemoveCase(n.Index);
                          //   forceUpdate();
                          // }}
                        >
                          X
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
          </div>
        </div>
      </Row>
      <div className="container fluid p-2">
        <Button variant="secondary" type="submit" className="p-2">
          Add component
        </Button>
        <DropdownButton
          title={addComponent}
          // onSelect={(e) => {
          //   DatabasesFilter(e);

          //   handleSelectProjectnameData(e);
          // }}
          variant="secondary"
        >
          {/* <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      {projectTemplate}
                    </Dropdown.Toggle> */}

          {Database[0].Data.map((n) => (
            <Dropdown.Item eventKey={n.Name} key={n.Name}>
              {n.Name}
            </Dropdown.Item>
          ))}
          {/* <Dropdown.Item eventKey={"New Project"} key={"New Project"}>
          New Project
        </Dropdown.Item> */}
        </DropdownButton>
      </div>

      <Canvas />
      {/* <Canvas2 /> */}
    </>
  );
};

export default Case;
