import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";

function CreateChallForm(props) {
  if (!props.loggedInUser || props.loggedInUser.points < 25000) {
    return <Redirect to='/challenges'/>
  }
  return (
    <div>
      <h1>Create a Challenge</h1>
      <Form onSubmit={props.onSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" type="text" placeholder="Title of the challenge" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" as="textarea" rows="3" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Points</Form.Label>
          {/* Remember to put a maximum to this field!! */}
          <Form.Control name="points" type="number" placeholder="Number of points" /> 
        </Form.Group>

        <Form.Text>
          Explanations about the points system
        </Form.Text>

        <Button variant="primary" type="submit">
          Create Challenge
        </Button>
      </Form>
    </div>
  );
}

export default CreateChallForm;
