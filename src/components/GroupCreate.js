import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from 'react-bootstrap/Card';
import "./styles/GroupCreate.css";


class GroupCreate extends Component {
  state = {
    groupChallenges: [],
    isSelected: null
  };

  componentDidMount() {
    axios.get(`${API_URL}/challenges`).then((response) => {
      let groupChallenges = response.data.filter((e) => e.status === "group");
      this.setState({
        groupChallenges: groupChallenges,
      });
    });
  }

  handleChallengeSelect = (challengeID) => {
    this.setState({
      isSelected: challengeID
    })
  }

  handleCreateGroup = (e) => {
    e.preventDefault();
    const {name, description, location, date} = e.currentTarget;
    axios.post(`${API_URL}/groups/create`, {
      name: name.value,
      description: description.value,
      location: location.value,
      date: date.value,
      user: this.props.loggedInUser,
      challenge: this.state.isSelected
    }, { withCredentials: true })
    .then((result) => {
      axios
        .post(
          `${API_URL}/achievements/create/${this.state.isSelected}/${this.props.loggedInUser._id}`,
          {},
          { withCredentials: true }
        )
        .then((res) => {
          this.props.history.push("/groups")
        });
    })
  }

  render() {
    if (!this.props.loggedInUser || this.props.loggedInUser.points < 10000) {
      return <Redirect to="/groups" />;
    }
    return (
      <div id="createGroup">
        <h1 className="createTitle">Create an Event</h1>
        <div className="white-card">
          <Form onSubmit={this.handleCreateGroup}>
            <Form.Group className="input-container">
              <Form.Label className="titles">Name of the event</Form.Label>
              <Form.Control
                className="inputs"
                name="name"
                type="text"
                placeholder="Name of the event"
              />
            </Form.Group>

            <Form.Group className="input-container">
              <Form.Label className="titles">Description</Form.Label>
              <Form.Control
                className="inputs"
                name="description"
                placeholder="Describe your event"
                as="textarea"
                rows="3"
              />
            </Form.Group>

            <Form.Group className="input-container">
              <Form.Label className="titles"> Select a challenge for your event </Form.Label>
              <Accordion>
              {this.state.groupChallenges.map((challenge, i) => {
                return (
                  <Card className="challengeContainer">
                    <Card.Header>
                      <Accordion.Toggle  as={Card.Header} variant="link" eventKey={i+1}>
                      <Form.Check onClick={() => this.handleChallengeSelect(challenge._id)} key={"challenge" + i} 
                        type="radio"
                        aria-label={challenge._id}
                        name="challengeSelector"
                        id={challenge._id}>
                      </Form.Check>
                      {challenge.title}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={i+1}>
                      <Card.Body  >
                      <div className="titles">Description:</div>
                      <p>{challenge.description}</p>
                      <div className="titles">Why is it useful?</div>
                      <p>{challenge.fact}</p>
                      <div className="titles">How many points will I get?</div>
                      <p>{challenge.points} points</p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                );
              })}
              </Accordion>
            </Form.Group>

            <Form.Group className="input-container">
              <Form.Label className="titles">Location</Form.Label>
              <Form.Control
                className="inputs"
                name="location"
                type="text"
                placeholder="Location of the event"
              />
            </Form.Group>

            <Form.Group className="input-container">
              <Form.Label className="titles">Date</Form.Label>
              <Form.Control className="inputs" name="date" type="date" />
            </Form.Group>

            <Button className="createBtn" variant="primary" type="submit">
              <img className="imageBtn1" src="/images/plant02.png" alt="o" />
              Create an event
              <img className="imageBtn2" src="/images/plant.png" alt="o" />
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default GroupCreate;
