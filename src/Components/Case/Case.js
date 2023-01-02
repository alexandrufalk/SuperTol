import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import Row from "react-bootstrap/esm/Row";
// import Col from "react-bootstrap/esm/Col";
// import "./case.css";

const Case = () => {
  const data = [
    { dim: 1, frequency: 13000 },
    { dim: 2, frequency: 14000 },
    { dim: 3, frequency: 15000 },
    { dim: 4, frequency: 16000 },
    { dim: 5, frequency: 17000 },
    { dim: 6, frequency: 18500 },
    { dim: 7, frequency: 17250 },
    { dim: 8, frequency: 16000 },
    { dim: 9, frequency: 15000 },
    { dim: 10, frequency: 14500 },
    { dim: 11, frequency: 13250 },
    { dim: 12, frequency: 12000 },
  ];
  const chartTheme = {
    axis: {
      style: {
        tickLabels: {
          // this changed the color of my numbers to white
          fill: "white",
        },
        data: {
          fill: "#c43a31",
        },
      },
    },
  };

  return (
    <>
      <p className="fs-3 border border-success-subtle m-2 rounded ">Case nr.</p>
      <div className="container-fluid shadow-lg p-3 mb-5 bg-body-tertiary rounded opacity-85">
        <VictoryChart
          // adding the material theme provided with Victory
          theme={chartTheme}
          domainPadding={30}
        >
          <VictoryAxis crossAxis tickValues={data.dim} label="Clearance [mm]" />
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
    </>
  );
};

export default Case;
