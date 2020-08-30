import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import "./styles/CreateChallForm.css";

function CreateChallForm(props) {
  if (!props.loggedInUser || props.loggedInUser.points < 25000) {
    return <Redirect to='/challenges'/>
  }
  return (
    <div className="createChallenge">
      <h1 className="createTitle">Create a Challenge</h1>
      <div className="white-card">
        <Form onSubmit={props.onSubmit}>
          <Form.Group className="input-container">
            <Form.Label className="titles">Title</Form.Label>
            <Form.Control className="inputs" name="title" type="text" placeholder="Title of the challenge" />
          </Form.Group>

          <Form.Group className="input-container">
            <Form.Label className="titles">Description</Form.Label>
            <Form.Control className="inputs" name="description" placeholder="Describe your challenge" as="textarea" rows="3" />
          </Form.Group>

          <Form.Group className="input-container">
            <Form.Label className="titles">Points</Form.Label>
            {/* Remember to put a maximum to this field!! */}
            <Form.Control className="inputs" name="points" type="number" max="10000" placeholder="Number of points. MAx 10000" /> 
          </Form.Group>

          <Form.Text>
            * As we want to encourage users to achieve short to mid term goals, <strong>we are capping the points at 10000</strong>.
          </Form.Text>

          <Button className="createBtn" variant="primary" type="submit">
          <img className="imageBtn1" src="/plant02.png" />
            Create Challenge
          <img className="imageBtn2" src="/plant.png" />
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default CreateChallForm;
