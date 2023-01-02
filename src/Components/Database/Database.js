import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";

const Database = () => {
  return (
    <>
      <p className="fs-3 ">Database</p>
      <Row>
        <div className="container horizontal-scrollable">
          <div className="row text-center">
            <Container className="p-3">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Index</th>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>Housing</td>
                    <td>Cover</td>
                    <td>PCB</td>
                  </tr>
                  <tr>
                    <th>Unique Identifier</th>
                    <td>D1</td>
                    <td>D2</td>
                    <td>D3</td>
                  </tr>
                  <tr>
                    <th>Drw. nr.</th>
                    <td>123</td>
                    <td>456</td>
                    <td>789</td>
                  </tr>
                  <tr>
                    <th>Nominal Value</th>
                    <td>10</td>
                    <td>9</td>
                    <td>8</td>
                  </tr>
                  <tr>
                    <th>Upper Tolerance</th>
                    <td>0.2</td>
                    <td>0.25</td>
                    <td>0.15</td>
                  </tr>
                  <tr>
                    <th>Lower Tolerance</th>
                    <td>-0.2</td>
                    <td>-0.25</td>
                    <td>-0.15</td>
                  </tr>
                  <tr>
                    <th>Upper Limit</th>
                    <td>10.2</td>
                    <td>9.25</td>
                    <td>8.15</td>
                  </tr>
                  <tr>
                    <th>Lower Limit</th>
                    <td>9.8</td>
                    <td>8.75</td>
                    <td>7.85</td>
                  </tr>
                  <tr>
                    <th>Tolerance Range</th>
                    <td>0.4</td>
                    <td>0.5</td>
                    <td>0.3</td>
                  </tr>
                  <tr>
                    <th>Distribution Type</th>
                    <td>Normal Cpk 1.66</td>
                    <td>Normal Cpk 1.66</td>
                    <td>Normal Cpk 1.66</td>
                  </tr>
                  <tr>
                    <th>Tolerance Type</th>
                    <td>General Tol.</td>
                    <td>General Tol.</td>
                    <td>General Tol.</td>
                  </tr>
                  <tr>
                    <th>Standard Deviation</th>
                    <td>0.25</td>
                    <td>0.1</td>
                    <td>0.06</td>
                  </tr>
                  <tr>
                    <th>Mean</th>
                    <td>2</td>
                    <td>2</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <th>Drawing</th>
                    <td>img1</td>
                    <td>img2</td>
                    <td>img3</td>
                  </tr>
                  <tr>
                    <th>Distribution Graph</th>
                    <td>graph1</td>
                    <td>graph2</td>
                    <td>graph3</td>
                  </tr>
                </thead>
                <tbody></tbody>
              </Table>
            </Container>
          </div>
        </div>
      </Row>
      <div className="d-flex justify-content-between">
        <Button variant="secondary" type="submit" className="px-2">
          Add component
        </Button>
        <Button variant="secondary" type="submit" className="px-2">
          Add Drawing
        </Button>
        <Button variant="info" type="submit" className="px-2">
          Edit
        </Button>
        <Button variant="danger" type="submit" className="px-2">
          Delete
        </Button>
        <Button variant="danger" type="submit" className="px-2">
          Clear Database
        </Button>
      </div>
    </>
  );
};
export default Database;
