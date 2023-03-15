import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddCase = () => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter Description" />
      </Form.Group>

      <Button type="button" variant="secondary">
        Add
      </Button>
    </Form>
  );
};

export default AddCase;
