import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import { withRouter } from "react-router-dom";
import "./styles/AddToMyGoals.css";


class AddToMyGoals extends Component {
  state = {
    loggedInUser: null,
    userGoalsIds: [],
    showPopUp: false,
  };

  componentDidMount() {
    if (!this.state.loggedInUser) {
      axios
        .get(`${API_URL}/auth/user`, { withCredentials: true })
        .then((res) => {
          axios
            .get(`${API_URL}/users/${res.data._id}`, { withCredentials: true })
            .then((user) => {
              axios
                .get(`${API_URL}/achievements/user/${user.data._id}`, {
                  withCredentials: true,
                })
                .then((achiev) => {
                  let goalsFull = achiev.data.filter((e) => {
                    return e.completed === false;
                  });
                  let goals = goalsFull.map((e) => e.challenge._id);
                  this.setState({
                    loggedInUser: user.data,
                    userGoalsIds: goals,
                  });
                });
            });
        });
    }
  }


  handleClick = () => {
    if (this.state.userGoalsIds.includes(this.props.challenge)) {
      this.setState({
        showPopUp: true
      });
    } else {
      axios
        .post(
          `${API_URL}/achievements/create/${this.props.challenge}/${this.state.loggedInUser._id}`,
          {},
          { withCredentials: true }
        )
        .then((res) => {
          this.props.onSuccess("Challenge added to your Goals!")
        });
    }
  };

  handleClose = (component) => {
      this.setState({
        showPopUp:false
      })
  }

  render() {
    return (
      <>
        <Button className="addThisGoalBtn" onClick={this.handleClick}>
          <img src="/images/valid.png" alt="Valid" />
          {
            this.props.fromOther ? <>I want to do it too!</> : <>Add this Goal!</>
          }
        </Button>
        <Modal show={this.state.showPopUp} onHide={() => this.handleClose('modal')}>
          <Modal.Header closeButton>
            <Modal.Title>Not yet!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You already have this challenge in your on going Goals. Finish it before to do it again. &#x1F609;{" "}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => this.handleClose('modal')}>
              Ok, got it
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(AddToMyGoals);
