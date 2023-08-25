import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { Spinner } from "react-bootstrap";
import {
  // VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryHistogram,
  VictoryLine,
  VictoryArea,
} from "victory";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/esm/Button";
import Canvas from "../Canvas/Canvas";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Canvas2 from "../Canvas/Canvas2";
import "./case.css";

const Case = () => {
  const [histData, setHistData] = useState([]);
  const [histBinData, setHistBinData] = useState([]);
  const [pdfData, setPdfData] = useState([]);
  const [addComponent, setAddComponent] = useState("Select Component");
  const [meanStatistic, setMeanStatistic] = useState("");
  const [gapCpk, setGapCpk] = useState("Gap Cpk");
  const [nrSamples, setNrSamples] = useState("Select Nr. of samples ");
  const [isSpinner, setIsSpinner] = useState(false);
  // const [isGraph, setIsGraph] = useState(false);

  const [statisticalForm, setStatisticalForm] = useState({
    meanS: "",
    UTS: "",
    LTS: "",
    Samples: "",
    Range: "",
    Pp: "",
    PpK: "",
    StDev: "",
    SigmaInt: "",
    PartsLess: "",
    PartsMore: "",
    Max: "",
  });
  console.log("statisticalForm", statisticalForm);

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
              DistributionType: "Normal Cpk 1.67",
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
              DistributionType: "Normal Cpk 1.67",
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
          CaseName: "Case2",
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
              DistributionType: "Normal Cpk 1.67",
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
              DistributionType: "Normal Cpk 1.67",
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
          DistributionType: "Normal Cpk 1.67",
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
          DistributionType: "Normal Cpk 1.67",
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
          DistributionType: "Normal Cpk 1.67",
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
          DistributionType: "Normal Cpk 1.67",
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

  // console.log("min", Math.min(...genNum), "max", Math.max(...genNum));
  const setSpinner = () => {
    toast("The chart is loading", {
      position: toast.POSITION.TOP_CENTER,
      theme: "dark",
    });
    setIsSpinner(true);
    console.log("setIsSpinner-True");
    setTimeout(() => setIsSpinner(false), 5000);
    // setIsGraph(true);
  };

  const generateStatistic = () => {
    if (gapCpk === "Gap Cpk" || nrSamples === "Select Nr. of samples ") {
      toast("Select Cpk gap and Nr. of samples!", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
      return;
    }
    console.log("Click to genereate statistic");
    setSpinner();

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

    //const inputs
    const samplenum = nrSamples;
    const mean = WorstCaseNominal;
    // const UT = WorstCaseTolerance;
    // const LT = -WorstCaseTolerance;
    let Cpk = gapCpk;
    const stddev = StandardDeviation;
    // const stddev =
    //   Math.round(((UT - LT) / (6 * Cpk) + Number.EPSILON) * 1000) / 1000;
    // console.log("stddev", stddev);

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
    console.log("calculatedMean", calculatedMean);
    setMeanStatistic(calculatedMean);
    let stddevupp = 0;

    let countN = {};
    genNum.forEach(function (i) {
      countN[i] = (countN[i] || 0) + 1;
    });
    console.log("countN", countN);
    let arr = Object.values(countN);
    let min = Math.min(...arr);
    let max = Math.max(...arr);

    console.log(`Min value: ${min}, max value: ${max}`);

    for (let i = 0; i < genNum.length; i += 1) {
      stddevupp = stddevupp + Math.pow(genNum[i] - calculatedMean, 2);
    }
    console.log("stddevupp", stddevupp);

    const calculatedstddev = Math.sqrt(stddevupp / (count - 1));
    console.log("calculatedstddev", calculatedstddev);

    // setStatisticalForm({ ...statisticalForm, StDev: calculatedstddev });

    const statisticalTol = 6 * calculatedstddev * Cpk;
    console.log("Statistical tolerance", statisticalTol);
    // setStatisticalForm({ ...statisticalForm, UTS: statisticalTol / 2 });
    // setStatisticalForm({ ...statisticalForm, LTS: -statisticalTol / 2 });

    //Statistical toerance

    //Pp Pp = (USL – LSL) / 6 * s :; See min and max generated numbers!
    const Pp = (2 * WorstCaseTolerance) / (6 * calculatedstddev);
    console.log("Pp", Pp);
    // setStatisticalForm({ ...statisticalForm, Pp: Pp });

    //Ppk
    const PpkU =
      (WorstCaseNominal + WorstCaseTolerance - calculatedMean) /
      (3 * calculatedstddev);
    const PpkL =
      (calculatedMean - (WorstCaseNominal - WorstCaseTolerance)) /
      (3 * calculatedstddev);

    const Ppk = Math.min(PpkU, PpkL);
    console.log("PpkL,PpkU", PpkL, PpkU);
    // setStatisticalForm({ ...statisticalForm, Ppk: Ppk });

    //Sigma interval Tolerance range/standard deviation
    const sigmaintv = (2 * WorstCaseTolerance) / calculatedstddev;
    // setStatisticalForm({ ...statisticalForm, SigmaInt: sigmaintv });
    setStatisticalForm({
      meanS: calculatedMean,
      UTS: statisticalTol / 2,
      LTS: -statisticalTol / 2,
      Samples: 100000,
      Range: statisticalTol,
      Pp: Pp,
      PpK: Ppk,
      StDev: calculatedstddev,
      SigmaInt: sigmaintv,
      PartsLess: "",
      PartsMore: "",
      Max: max,
    });

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

    setTimeout(() => {
      setHistData(genNumHist);
      setHistBinData(histBinNum);
      setPdfData(PDFdataGraph);
      setIsSpinner(false);
    }, 1000); // Simulate a 5-second delay
  };

  const handleCpkChange = (e) => {
    setGapCpk(e.target.value);
  };
  const handleNrSamples = (e) => {
    setNrSamples(e.target.value);
  };
  console.log("Gap Cpk:", gapCpk);

  return (
    <>
      <p className="fs-3 border border-success-subtle p-2 rounded ">Case nr.</p>
      <Form.Group controlId="formGridState" className="col col-sm-6">
        <Form.Label>Select gap Cpk</Form.Label>
        <Form.Select
          // defaultValue="Gap Cpk"
          className="form-control"
          name="Gap Cpk"
          value={gapCpk}
          onChange={(e) => {
            handleCpkChange(e);
          }}
        >
          <option value="Gap Cpk">Gap Cpk</option>
          <option value="1">Normal Cpk 1</option>
          <option value="1.33">Normal Cpk 1.33</option>
          <option value="1.67">Normal Cpk 1.67</option>
          <option value="2">Normal Cpk 2</option>
        </Form.Select>
        <Form.Select
          // defaultValue="Select Nr. of samples "
          className="form-control"
          name="Select Nr. of samples "
          value={nrSamples}
          onChange={(e) => {
            handleNrSamples(e);
          }}
        >
          <option value="Select Nr. of samples ">Select Nr. of samples </option>
          <option value="10000">10000</option>
          <option value="25000">25000</option>
          <option value="50000">50000</option>
          <option value="100000">100000</option>
        </Form.Select>
        <ToastContainer transition={Bounce} autoClose={2000} />
      </Form.Group>
      <div className="container fluid p-2">
        <Button
          variant="secondary"
          className="px-2"
          onClick={() => {
            generateStatistic();
          }}
        >
          Generate Statistic
        </Button>
      </div>
      {isSpinner && <Spinner animation="border" variant="secondary" />}
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
              <div className="boxgraph overlaygraph ">
                <VictoryChart domainPadding={{ x: 50, y: 25 }}>
                  <VictoryLine data={pdfData} />
                  <VictoryArea
                    style={{
                      data: {
                        fill: "#2d7d44",
                        fillOpacity: 0.4,
                      },
                    }}
                    data={[
                      {
                        x:
                          ((statisticalForm.meanS +
                            statisticalForm.LTS +
                            Number.EPSILON) *
                            1000) /
                          1000,
                        y: statisticalForm.Max,
                        y0: 0,
                      },
                      {
                        x:
                          ((statisticalForm.meanS +
                            statisticalForm.UTS +
                            Number.EPSILON) *
                            1000) /
                          1000,
                        y: statisticalForm.Max,
                        y0: 0,
                      },
                    ]}
                  />

                  <VictoryAxis
                    style={{
                      axis: { stroke: "transparent" },
                      ticks: { stroke: "transparent" },
                      tickLabels: { fill: "transparent" },
                    }}
                  />
                </VictoryChart>
              </div>
              {/* <div className="boxgraph overlaygraph ">
                <VictoryChart>
                  <VictoryArea
                    data={[
                      {
                        x: 23,
                        y: statisticalForm.Max,
                        y0: 0,
                      },
                      {
                        x: 25,
                        y: statisticalForm.Max,
                        y0: 0,
                      },
                    ]}
                  />
                  <VictoryAxis
                    domain={histBinData}
                    // theme={VictoryTheme.material}

                    standalone={false}
                  />
                </VictoryChart>
              </div> */}

              {/* <div className="boxgraph overlaygraph ">
                <VictoryChart domainPadding={{ x: 50, y: 25 }}>
                  <VictoryLine
                    data={[
                      { x: statisticalForm.meanS - statisticalForm.LTS, y: 0 },
                      {
                        x: statisticalForm.meanS - statisticalForm.LTS,
                        y: statisticalForm.Max,
                      },
                    ]}
                  />
                  <VictoryAxis
                    domain={histBinData}
                    // theme={VictoryTheme.material}

                    standalone={false}
                  />
                </VictoryChart>
              </div> */}
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
                  <div className="container-fluid tabelCase text-light ">
                    <h3>Worst Case</h3>
                    <ListGroup className="shadow p-3 mb-5 bg-body-tertiary rounded opacity-75 rounded-4">
                      <ListGroup.Item className="fs-5 tabelCase text-light">
                        {`Nominal:${WorstCaseNominal}`}
                      </ListGroup.Item>
                      <ListGroup.Item className="tabelCase text-light">{`Upper Tolerance: ${WorstCaseTolerance}`}</ListGroup.Item>
                      <ListGroup.Item className="tabelCase text-light">{`Lower Tolerance: ${-WorstCaseTolerance}`}</ListGroup.Item>
                      <ListGroup.Item className="tabelCase text-light">{`Upper Limit: ${
                        WorstCaseNominal + WorstCaseTolerance
                      }`}</ListGroup.Item>
                      <ListGroup.Item className="tabelCase text-light">{`Lower Limit: ${
                        WorstCaseNominal - WorstCaseTolerance
                      }`}</ListGroup.Item>
                      <ListGroup.Item className="tabelCase text-light">{`Range: ${
                        2 * WorstCaseTolerance
                      }`}</ListGroup.Item>
                      <ListGroup.Item className="tabelCase text-light">{`Symmetric:${WorstCaseNominal} ±${WorstCaseTolerance}`}</ListGroup.Item>
                    </ListGroup>
                  </div>
                </Col>
                <Col>
                  <div className="container-fluid tabelCase text-light">
                    <h3>Statistic</h3>
                    <ListGroup className="shadow p-3 mb-5 bg-body-tertiary rounded opacity-75 ">
                      <ListGroup.Item className="fs-5 tabelCase text-light rounded-4">
                        {`Mean: ${meanStatistic}`}
                      </ListGroup.Item>
                      <ListGroup.Item className="tabelCase text-light">{`Upper Tolerance:${statisticalForm.UTS} `}</ListGroup.Item>
                      <ListGroup.Item className="tabelCase text-light">{`Lower Tolerance:${statisticalForm.LTS} `}</ListGroup.Item>
                      <ListGroup.Item className="tabelCase text-light">
                        Samples: 100000
                      </ListGroup.Item>
                      <ListGroup.Item className="tabelCase text-light">{`Range: ${
                        statisticalForm.UTS - statisticalForm.LTS
                      }`}</ListGroup.Item>
                      <ListGroup.Item className="tabelCase text-light">
                        Pp:{statisticalForm.Pp}
                      </ListGroup.Item>
                      <ListGroup.Item className="tabelCase text-light">
                        Ppk:{statisticalForm.PpK}
                      </ListGroup.Item>
                      <ListGroup.Item className="tabelCase text-light">
                        St.Dev[σ]:{statisticalForm.StDev}
                      </ListGroup.Item>
                      <ListGroup.Item className="tabelCase text-light">
                        Sigma intv.: {statisticalForm.SigmaInt}
                      </ListGroup.Item>
                      <ListGroup.Item className="tabelCase text-light">
                        Parts less LSL{" "}
                      </ListGroup.Item>
                      <ListGroup.Item className="tabelCase text-light rounded-4">
                        Parts more USL
                      </ListGroup.Item>
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
                    <tr key={n.ID + "trtest"}>
                      <td>{n.ID}</td>
                      <td>{n.Name}</td>
                      <td>{n.Description}</td>
                      <td>{n.UniqueIdentifier}</td>
                      <td>{n.NominalValue}</td>
                      <td>{n.UpperTolerance}</td>
                      <td>{n.LowerTolerance}</td>
                      <td>{n.Sign}</td>
                      <td>{n.DistributionType}</td>
                      <td>{n.ToleranceType}</td>
                      <td>
                        {Math.round(
                          ((((n.UpperTolerance - n.LowerTolerance) / 2) * 100) /
                            WorstCaseTolerance +
                            Number.EPSILON) *
                            100
                        ) / 100}
                      </td>
                      <td>{n.Formula}</td>
                      <td>
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
        {/* <Button variant="secondary" type="submit" className="p-2">
          Add component
        </Button> */}
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
            <Dropdown.Item eventKey={n.Name} key={n.Name + "Data"}>
              {n.Name}
            </Dropdown.Item>
          ))}
          {/* <Dropdown.Item eventKey={"New Project"} key={"New Project"}>
          New Project
        </Dropdown.Item> */}
        </DropdownButton>
      </div>
      <div className="scrollmenu">
        <Canvas canvasDatabse={DatabaseCalculation} />
      </div>
      {/* <Canvas2 /> */}
    </>
  );
};

export default Case;
