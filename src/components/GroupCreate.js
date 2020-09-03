import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import { Redirect } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from 'react-bootstrap/Card';
import "./styles/GroupCreate.css";


class GroupCreate extends Component {
  state = {
    groupChallenges: [],
    isSelected: null,
    showModal: false,
    modalMessage : "",
    modalHeader: "",
    modalButtonType: "",
    modalButtonStyle: {}
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

    let todaysDate = new Date(Date.now())
    todaysDate.setHours(0)
    console.log("are we creating?")

   
    const {name, description, location, date} = e.currentTarget;
    if(name.value === ""){
      this.setState({
        showModal: true,
        modalMessage : "Please enter a name for your event",
        modalHeader: "Oops",
        modalButtonType: "success",
      })
    } else if (this.state.isSelected === null) {
      this.setState({
        showModal: true,
        modalMessage : "Please choose a challenge for your event",
        modalHeader: "Oops",
        modalButtonType: "success",
      })
    }  else if (location.value === ""){
      this.setState({
        showModal: true,
        modalMessage : "Please choose a location for your event",
        modalHeader: "Oops",
        modalButtonType: "success",
      })
    } else if (date.value === ""){
      this.setState({
        showModal: true,
        modalMessage : "Please choose a date for your event",
        modalHeader: "Oops",
        modalButtonType: "success",
      })
      
      } else if (new Date(date.value) < todaysDate) {
        
        this.setState({
          showModal: true,
          modalMessage : "Your event can't be in the past!",
          modalHeader: "Oops",
          modalButtonType: "success",
        })
        } else {
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
        })
        .catch((err) => {
          console.log("this is for achievements", err)
        })
    })
        .catch((err) => {
          console.log("this is for groups", err)
        })
  }
}


  handleModalClose = () => {
    this.setState({
      showModal: false
    })
  }

  fixTodayDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    if(dd<10)dd='0'+dd
    if(mm<10)mm='0'+mm
    return yyyy+'-'+mm+'-'+dd;
  }

  render() {
    // if (!this.props.loggedInUser || this.props.loggedInUser.points < 10000) {
    //   return <Redirect to="/groups" />;
    // }
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
                required
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
                required
              />
            </Form.Group>

            <Form.Group className="input-container">
              <Form.Label className="titles">Date</Form.Label>
              <Form.Control className="inputs" name="date" type="date" required min={this.fixTodayDate()}/> 
            </Form.Group>

            <Button className="createBtn" variant="primary" type="submit">
              <img className="imageBtn1" src="/images/plant02.png" alt="o" />
              Create an event
              <img className="imageBtn2" src="/images/plant.png" alt="o" />
            </Button>
          </Form>
        </div>

        <Modal show={this.state.showModal} onHide={this.handleModalClose} >
          <Modal.Header closeButton style={this.state.modalButtonStyle}>
            <Modal.Title>{this.state.modalHeader}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.modalMessage}
          </Modal.Body>
          <Modal.Footer style={this.state.modalButtonStyle}>
            <Button variant={this.state.modalButtonType} onClick={this.handleModalClose}>
              Ok, got it
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default GroupCreate;
