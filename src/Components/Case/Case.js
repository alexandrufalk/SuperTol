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
// import Canvas2 from "../Canvas/Canvas2";
import "./case.css";

const Case = () => {
  const [histData, setHistData] = useState([]);
  const [histBinData, setHistBinData] = useState([]);
  const [pdfData, setPdfData] = useState([]);

  console.log("histData", histData);
  console.log("histBinData", histBinData);
  console.log("pdfData", pdfData);

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
                        Nominal: 0
                      </ListGroup.Item>
                      <ListGroup.Item>Upper Tolerance: 1.8</ListGroup.Item>
                      <ListGroup.Item>Lower Tolerance: -1.8</ListGroup.Item>
                      <ListGroup.Item>Upper Limit: 1.8</ListGroup.Item>
                      <ListGroup.Item>Lower Limit: -1.8</ListGroup.Item>
                      <ListGroup.Item>Range: 3.6</ListGroup.Item>
                      <ListGroup.Item>Symmetric: ±1.8</ListGroup.Item>
                    </ListGroup>
                  </div>
                </Col>
                <Col>
                  <div className="container-fluid">
                    <h3>Statistic</h3>
                    <ListGroup className="shadow p-3 mb-5 bg-body-tertiary rounded opacity-75">
                      <ListGroup.Item className="fs-5">
                        Mean: 0.01
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
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Housing</td>
                    <td>Dim.1</td>
                    <td>D1</td>
                    <td>10</td>
                    <td>0.2</td>
                    <td>-0.2</td>
                    <td>+</td>
                    <td>Normal Cpk 1.66</td>
                    <td>General Tol.</td>
                    <td>40</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Cover</td>
                    <td>Dim.2</td>
                    <td>D2</td>
                    <td>9</td>
                    <td>0.25</td>
                    <td>-0.25</td>
                    <td>-</td>
                    <td>Normal Cpk 1.66</td>
                    <td>General Tol.</td>
                    <td>30</td>
                    <td></td>
                  </tr>
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
      </div>

      <Canvas />
      {/* <Canvas2 /> */}
    </>
  );
};

export default Case;
