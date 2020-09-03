import React, { Component } from "react";
import ExperienceBar from "./ExperienceBar";
import axios from "axios";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import SocialMedia from "./SocialMedia"
import Loading from "./Loading"
import "./styles/GoalsAndSucces.css";

class GoalsAndSuccess extends Component {
  state = {
    userAchievements: [],
    showDeletePopup: false,
    targetedAchievID: null,
    filteredAchievements: [],
    userGroups: null,
  };

  getUsersInfos = () => {
    axios
      .get(`${API_URL}/achievements/user/${this.props.loggedInUser._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        axios
          .get(`${API_URL}/groups/user/${this.props.loggedInUser._id}`, {
            withCredentials: true,
          })
          .then((groups) => {
            console.log(groups);
            this.setState({
              userAchievements: res.data,
              filteredAchievements: res.data,
              userGroups: groups.data,
            });
          });
      });
  };

  componentDidMount() {
    if (this.props.loggedInUser) {
      this.getUsersInfos();
    }
  }

  componentDidUpdate(newProps) {
    if (!newProps.loggedInUser) {
      this.getUsersInfos();
    }
  }

  handleClick = (achievID) => {
    this.setState({
      showDeletePopup: true,
      targetedAchievID: achievID,
    });
  };

  handleClose = () => {
    this.setState({
      showDeletePopup: false,
    });
  };

  handleDelete = (achievID) => {
    axios
      .delete(`${API_URL}/achievements/${achievID}`, { withCredentials: true })
      .then((res) => {
        let clonedUserAchiev = JSON.parse(
          JSON.stringify(this.state.userAchievements)
        );
        clonedUserAchiev.forEach((e, i) => {
          if (e._id === res.data._id) clonedUserAchiev.splice(i, 1);
        });
        this.setState({
          userAchievements: clonedUserAchiev,
          showDeletePopup: false,
        });
      });
  };

  handleSearchAch = (e) => {
    let searchAch = e.currentTarget.value.toLowerCase();
    let cloneUserAchievements = this.state.userAchievements.filter((item) => {
      return (
        item.completed === true &&
        (item.challenge.title.toLowerCase().includes(searchAch) ||
          item.challenge.description.toLowerCase().includes(searchAch))
      );
    });
    this.setState({
      filteredAchievements: cloneUserAchievements,
    });
  };

  render() {
    if (!this.state.userAchievements || !this.state.userGroups || !this.props.loggedInUser) {
      return <Loading/>
    }

    return (
      <div id="goalsSuccess">
        <div className="exp-bar">
          <ExperienceBar loggedInUser={this.props.loggedInUser} />
        </div>
        <h3 className="title">Your Goals & Success</h3>
        <div className="white-card">
          <div className="goals">
            <h4 className="subtitle">
              <img src="/images/plant02.png" alt="o" />
              Your EcoHero Tasks
            </h4>
            {this.state.userAchievements.filter((e) => e.completed === false)
              .length === 0 ? (
              <div>You don't have any goal set yet... </div>
            ) : (
              ""
            )}
            {this.state.userAchievements.map((achievement, i) => {
              if (
                !achievement.completed &&
                achievement.challenge.status !== "group"
              ) {
                let startDate = new Date(achievement.starting_date);
                let date = "0" + startDate.getDate();
                let month = "0" + (startDate.getMonth() + 1);
                let start = date.slice(-2) + "/" + month.slice(-2);
                return (
                  <div className="achiev-container" key={"goals" + i}>
                    <Link
                      className="date-title"
                      to={`/achievement/${achievement._id}`}
                    >
                      <p>{start}</p>
                      <h6>{achievement.challenge.title}</h6>
                    </Link>
                    <div className="edit-btn">
                      <Link to={`/goals-edit/${achievement._id}`}>
                        <img src="/images/valid.png" alt="Valid" />
                      </Link>
                      <button onClick={() => this.handleClick(achievement._id)}>
                        <img src="/images/delete.png" alt="Delete" />
                      </button>
                    </div>
                  </div>
                );
              }
            })}
            <div className="btn-container">
              <Link className="btn-add" to="/challenges">
                Add one more !
              </Link>
            </div>
          </div>

          <div className="events">
            <h4 className="subtitle">
              <img src="/images/plant02.png" alt="o" />
              Your upcoming events
            </h4>
            {this.state.userGroups.map((event, i) => {
              let eventDate = new Date(event.date);
              let date = "0" + eventDate.getDate();
              let month = "0" + (eventDate.getMonth() + 1);
              eventDate = date.slice(-2) + "/" + month.slice(-2);
              if (event.finished === false) {
                return (
                  <div className="achiev-container" key={"event" + i}>
                    <Link className="event-info" to={`/groups/${event._id}`}>
                      <p>{eventDate}</p>
                      <h6>{event.name}</h6>
                      <p>{event.location}</p>
                    </Link>
                    {event.members[0]._id === this.props.loggedInUser._id ? (
                      <div className="edit-btn">
                        <Link to={`/event-edit/${event._id}`}>
                          <img src="/images/valid.png" alt="Valid" />
                        </Link>
                        <button>
                          <img src="/images/delete.png" alt="Delete" />
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              }
            })}
          </div>

          <div>
            <h4 className="subtitle">
              <img src="/images/plant02.png" alt="o" />
              You already nailed it!
            </h4>

            <InputGroup className="mb-3 searchBar">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">&#128270;</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={this.handleSearchAch}
                placeholder="Search for a success"
                aria-label="Search for a success"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            {this.state.filteredAchievements.filter((e) => e.completed === true)
              .length === 0 ? (
              <div>No Success yet... </div>
            ) : (
              ""
            )}

            {this.state.filteredAchievements.map((achievement, i) => {
              let successDate = new Date(achievement.finishing_date);
              let date = "0" + successDate.getDate();
              let month = "0" + (successDate.getMonth() + 1);
              successDate = date.slice(-2) + "/" + month.slice(-2);
              if (achievement.completed) {
                return (
                  <div className="achiev-container" key={"success" + i}>
                    <Link
                      className="date-title"
                      to={`/achievement/${achievement._id}`}
                    >
                      <p>{successDate}</p>
                      <h6>{achievement.challenge.title}</h6>
                    </Link>

                    <SocialMedia achievementID={achievement._id} />
                  </div>
                );
              }
            })}

            {this.state.userGroups.map((event, i) => {
              let successDate = new Date(event.date);
              let date = "0" + successDate.getDate();
              let month = "0" + (successDate.getMonth() + 1);
              successDate = date.slice(-2) + "/" + month.slice(-2);
              if (event.finished) {
                return (
                  <div className="achiev-container" key={"success" + i}>
                    <Link
                      className="date-title"
                      to={`/groups/${event._id}`}
                    >
                      <p>{successDate}</p>
                      <h6>{event.name}</h6>
                    </Link>

                    <SocialMedia achievementID={event._id} />
                  </div>
                );
              }
            })}

          </div>
        </div>
        <Modal show={this.state.showDeletePopup} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this goal from your list ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleClose}>
              No, not yet.
            </Button>
            <Button
              variant="success"
              onClick={() => this.handleDelete(this.state.targetedAchievID)}
            >
              Yes, I'm sure!
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default GoalsAndSuccess;
