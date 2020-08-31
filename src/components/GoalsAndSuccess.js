import React, { Component } from "react";
import ExperienceBar from "./ExperienceBar";
import axios from "axios";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import "./styles/GoalsAndSucces.css";

class GoalsAndSuccess extends Component {
  state = {
    userAchievements: [],
    showDeletePopup: false,
    targetedAchievID: null,
    filteredAchievements: []
  };

  componentDidMount() {
    if (this.props.loggedInUser) {
      axios
        .get(`${API_URL}/achievements/user/${this.props.loggedInUser._id}`, {
          withCredentials: true,
        })
        .then((res) => {
          this.setState({
            userAchievements: res.data,
            filteredAchievements: res.data

          });
        });
    }
  }

  componentDidUpdate(newProps) {
    if (!newProps.loggedInUser) {
      axios
        .get(`${API_URL}/achievements/user/${this.props.loggedInUser._id}`, {
          withCredentials: true,
        })
        .then((res) => {
          this.setState({
            userAchievements: res.data,
          });
        });
    }
  }

  handleClick = (achievID) => {
    this.setState({
      showDeletePopup: true,
      targetedAchievID: achievID
    })
  }

  handleClose = () => {
    this.setState({
      showDeletePopup:false
    })
  }

  handleDelete = (achievID) => {
    axios.delete(`${API_URL}/achievements/${achievID}`, {withCredentials: true})
      .then((res) => {
        let clonedUserAchiev = JSON.parse(JSON.stringify(this.state.userAchievements))
        clonedUserAchiev.forEach((e, i) => {
          if(e._id === res.data._id)  clonedUserAchiev.splice(i, 1)
        })
        this.setState({
          userAchievements: clonedUserAchiev,
          showDeletePopup:false
        })
      })
  };

  handleSearchAch = (e) => {
    let searchAch = e.currentTarget.value.toLowerCase()
    let cloneUserAchievements = this.state.userAchievements.filter((item) => {
      return (item.completed===true && (item.challenge.title.toLowerCase().includes(searchAch) || item.challenge.description.toLowerCase().includes(searchAch)))
    })
    this.setState({
      filteredAchievements: cloneUserAchievements
    })
    
  }
  
  render() {
    if (!this.state.userAchievements || !this.props.loggedInUser) {
      return (
        <p>
          Loading... If you're not login yet, please{" "}
          <Link to="/login">click on this link</Link>
        </p>
      );
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
              if (!achievement.completed) {
                return (
                  <div className="achiev-container" key={"goals" + i}>
                    <Link to={`/achievement/${achievement._id}`}>
                      <h6>{achievement.challenge.title}</h6>
                    </Link>
                    <div className="edit-btn">
                      <Link to={`/goals-edit/${achievement._id}`}>
                        <img src="/images/valid.png" alt="Valid" />
                      </Link>
                      <button
                        onClick={() => this.handleClick(achievement._id)}
                      >
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


            {
                this.state.filteredAchievements.filter(e => e.completed === true).length === 0 ? <div>No Success yet... </div> : ""
            }
           
            {this.state.filteredAchievements.map((achievement, i) => {
              if (achievement.completed) {
                return (
                  <div className="achiev-container" key={"success" + i}>
                    <Link to={`/achievement/${achievement._id}`}>
                      <h6>{achievement.challenge.title}</h6>
                    </Link>
                    <div className="sharing-logos">Sharing Logos</div>
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
            <Button variant="success" onClick={() => this.handleDelete(this.state.targetedAchievID)}>
              Yes, I'm sure!
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default GoalsAndSuccess;
