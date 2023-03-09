import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";

import "./database.css";

import ImportImage from "../ImportImage/ImportImage.tsx";

const Database = () => {
  const Database = [
    {
      Index: 1,
      Name: "Housing",
      UniqueIdentifier: "D1",
      DrwNr: "123",
      NominalValue: 10,
      UpperTolerance: 0.4,
      LowerTolerance: -0.4,
      DistributionType: "Normal Cpk 1.66",
      ToleranceType: "General Tol.",
    },
    {
      Index: 10,
      Name: "Cover",
      UniqueIdentifier: "D1",
      DrwNr: "123",
      NominalValue: 2,
      UpperTolerance: 1,
      LowerTolerance: -1,
      DistributionType: "Normal Cpk 1.33",
      ToleranceType: "General Tol.",
    },
    {
      Index: 12,
      Name: "Connector",
      UniqueIdentifier: "D1",
      DrwNr: "123",
      NominalValue: 10,
      UpperTolerance: 0.2,
      LowerTolerance: -0.2,
      DistributionType: "Normal Cpk 1.66",
      ToleranceType: "General Tol.",
    },
  ];

  console.log("Database", Database[0].Index);

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
                    {Database.map((n) => (
                      <td key={n.Index}> {n.Index}</td>
                    ))}
                  </tr>
                  <tr>
                    <th>Name</th>
                    {Database.map((n) => (
                      <td key={n.Index}> {n.Name}</td>
                    ))}
                  </tr>
                  <tr>
                    <th>Unique Identifier</th>
                    {Database.map((n) => (
                      <td key={n.Index}> {n.UniqueIdentifier}</td>
                    ))}
                  </tr>
                  <tr>
                    <th>Drw. nr.</th>
                    {Database.map((n) => (
                      <td key={n.Index}> {n.DrwNr}</td>
                    ))}
                  </tr>
                  <tr>
                    <th>Nominal Value</th>
                    {Database.map((n) => (
                      <td key={n.Index}> {n.NominalValue}</td>
                    ))}
                  </tr>
                  <tr>
                    <th>Upper Tolerance</th>
                    {Database.map((n) => (
                      <td key={n.Index}> {n.UpperTolerance}</td>
                    ))}
                  </tr>
                  <tr>
                    <th>Lower Tolerance</th>
                    {Database.map((n) => (
                      <td key={n.Index}> {n.LowerTolerance}</td>
                    ))}
                  </tr>
                  <tr>
                    <th>Upper Limit</th>
                    {Database.map((n) => (
                      <td key={n.Index}>{n.NominalValue + n.UpperTolerance}</td>
                    ))}
                  </tr>
                  <tr>
                    <th>Lower Limit</th>
                    {Database.map((n) => (
                      <td key={n.Index}>{n.NominalValue + n.LowerTolerance}</td>
                    ))}
                  </tr>
                  <tr>
                    <th>Tolerance Range</th>
                    {Database.map((n) => (
                      <td key={n.Index}>
                        {n.UpperTolerance - n.LowerTolerance}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th>Distribution Type</th>
                    {Database.map((n) => (
                      <td key={n.Index}> {n.DistributionType}</td>
                    ))}
                  </tr>
                  <tr>
                    <th>Tolerance Type</th>
                    {Database.map((n) => (
                      <td key={n.Index}> {n.ToleranceType}</td>
                    ))}
                  </tr>
                  <tr>
                    <th>Standard Deviation</th>
                    {Database.map((n) => (
                      <td key={n.Index}>
                        {Math.round(
                          ((n.UpperTolerance - n.LowerTolerance) /
                            (6 *
                              parseFloat(
                                n.DistributionType.replace(/[^\d.]*/g, "")
                              )) +
                            Number.EPSILON) *
                            100
                        ) / 100}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th>Mean</th>
                    {Database.map((n) => (
                      <td key={n.Index}>
                        {(n.NominalValue +
                          n.UpperTolerance +
                          n.NominalValue +
                          n.LowerTolerance) /
                          2}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th>Drawing</th>
                    {Database.map((n) => (
                      <td key={n.Index}>
                        <div className="addImage">
                          {/* <AddImage index={n.Index} /> */}
                          {/* <Image
                            width={150}
                            src={
                              "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png"
                            }
                          /> */}
                          <ImportImage />
                        </div>
                      </td>
                    ))}
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

      <div className="container fluid  text-center ">
        <Button variant="secondary" type="submit" className="m-2">
          Add component
        </Button>
        <Button variant="secondary" type="submit" className="m-2">
          Add Drawing
        </Button>
        <Button variant="info" type="submit" className="m-2">
          Edit
        </Button>
        <Button variant="danger" type="submit" className="m-2">
          Delete
        </Button>
        <Button variant="danger" type="submit" className="m-2">
          Clear Database
        </Button>
      </div>
    </>
  );
};
export default Database;
