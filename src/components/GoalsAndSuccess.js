import React, { Component } from "react";
import ExperienceBar from "./ExperienceBar";
import axios from "axios";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import "./styles/GoalsAndSucces.css";

class GoalsAndSuccess extends Component {
  state = {
    userAchievements: [],
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

  handleSearchAch = (e) => {
    let searchAch = e.currentTarget.value.toLowerCase()
    let cloneUserAchievements = this.state.userAchievements.filter((item) => {
      console.log(this.state.userAchievements)
      // console.log(item)
      // console.log(item.challenge.title)  
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
              <img src="/images/plant02.png" alt="o"/>
              Your EcoHero Tasks
            </h4>
            {
                this.state.userAchievements.filter(e => e.completed === false).length === 0 ? <div>You don't have any goal set yet... </div> : ""
              }
            {this.state.userAchievements.map((achievement, i) => {
              if (!achievement.completed) {
                return (
                  <div className="achiev-container" key={"goals" + i}>
                    <Link to={`/achievement/${achievement._id}`}>
                      <h6>{achievement.challenge.title}</h6>
                    </Link>
                    <div className="edit-btn">
                      <Link to={`/goals-edit/${achievement._id}`}><img src="/images/valid.png" alt="Valid" /></Link>
                      <a href="/"><img src="/images/delete.png" alt="Delete" /></a>
                    </div>
                  </div>
                );
              }
            })}
            <div className="btn-container">
            <Link className="btn-add" to="/challenges">Add one more !</Link>
            </div>
          </div>

          <InputGroup className="mb-4">
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
        
          <div>
            <h4 className="subtitle">
              <img src="/images/plant02.png" alt="o" />
              You already nailed it!
            </h4>
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
      </div>
    );
  }
}

export default GoalsAndSuccess;
