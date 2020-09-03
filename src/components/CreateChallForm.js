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
    <div id="createChallenge">
      <h1 className="createTitle">Create a Challenge</h1>
      <div className="white-card">
        <Form onSubmit={props.onSubmit}>
          <Form.Group className="input-container">
            <Form.Label className="titles">Title</Form.Label>
            <Form.Control className="inputs" name="title" type="text" placeholder="Title of the challenge" required={true} />
          </Form.Group>

          <Form.Group className="input-container">
            <Form.Label className="titles">Description</Form.Label>
            <Form.Control className="inputs" name="description" placeholder="Describe your challenge" as="textarea" rows="3" />
          </Form.Group>

          <Form.Group className="input-container">
            <Form.Label className="titles">Why is it useful?</Form.Label>
            <Form.Control className="inputs" name="fact" placeholder="Why is your challenge important for the planet?" as="textarea" rows="3" />
          </Form.Group>

          <Form.Group className="input-container">
            <Form.Label className="titles">Points</Form.Label>
            <Form.Control className="inputs" name="points" type="number" max="10000" min="50" placeholder="Max. 10 000" /> 
          </Form.Group>

          <Form.Text >
          <div className="rulesContainer">
            <p><strong>Guideline:</strong></p>
          </div>
          <div className="summary">
            <p className="rules"><strong>1.</strong> <u>Short term goals</u>: between 100 and 1000 points</p>
            <p className="rules"><strong>2.</strong> <u>Mid term goals</u>: between 1000 and 10000 points</p>
            <p className="rules"><strong>3.</strong> <u>Long term goals</u>: 10000+ points</p>
          </div>
           
            <p className="rules"><strong>*</strong> As we want to encourage users to achieve short to mid term goals, <strong>we are capping the points at 10 000</strong>.</p>
          </Form.Text>

          <Button className="createBtn" variant="primary" type="submit">
          <img className="imageBtn1" src="/images/plant02.png" alt="o"  />
            Create Challenge
          <img className="imageBtn2" src="/images/plant.png" alt="o"  />
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default CreateChallForm;
