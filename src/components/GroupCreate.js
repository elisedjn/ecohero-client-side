import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import "./styles/GroupCreate.css";

function GroupCreate(props) {
  if (!props.loggedInUser || props.loggedInUser.points < 10000) {
    return <Redirect to='/groups'/>
  }
  return (
    <div id="createGroup">
      <h1 className="createTitle">Create a Group</h1>
      <div className="white-card">
        <Form onSubmit={props.onSubmit}>
          <Form.Group className="input-container">
            <Form.Label className="titles">Name of the group</Form.Label>
            <Form.Control className="inputs" name="name" type="text" placeholder="Name of the group" />
          </Form.Group>

          <Form.Group className="input-container">
            <Form.Label className="titles">Description</Form.Label>
            <Form.Control className="inputs" name="description" placeholder="Describe your challenge" as="textarea" rows="3" />
          </Form.Group>

          <Form.Group className="input-container">
            <Form.Label className="titles">Location</Form.Label>
            <Form.Control className="inputs" name="location" type="text" placeholder="Location of the challenge" />
          </Form.Group>

          <Form.Group className="input-container">
            <Form.Label className="titles">Date</Form.Label>
            <Form.Control className="inputs" name="date" type="date" /> 
          </Form.Group>

          
          <Button className="createBtn" variant="primary" type="submit">
          <img className="imageBtn1" src="/images/plant02.png" alt="o"  />
            Create a group
          <img className="imageBtn2" src="/images/plant.png" alt="o"  />
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default GroupCreate;
