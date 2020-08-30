import React, { Component } from "react";
import ExperienceBar from "./ExperienceBar";
import axios from "axios";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import "./styles/GoalsAndSucces.css";

class GoalsAndSuccess extends Component {
  state = {
    userAchievements: [],
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
          });
        });
    }
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
              <img src="/images/plant02.png" />
              Your EcoHero Tasks
            </h4>
            {this.state.userAchievements.map((achievement, i) => {
              if (!achievement.completed) {
                return (
                  <div className="achiev-container" key={"goals" + i}>
                    <Link to={`/achievement/${achievement._id}`}>
                      <h6>{achievement.challenge.title}</h6>
                    </Link>
                    <div className="edit-btn">
                      <Link to={`/goals-edit/${achievement._id}`}><img src="/images/valid.png" alt="Valid" /></Link>
                      <a><img src="/images/delete.png" alt="Delete" /></a>
                    </div>
                  </div>
                );
              }
            })}
            <div className="btn-container">
            <Link className="btn-add" to="/challenges">Add one more !</Link>
            </div>
          </div>

          <div>
            <h4 className="subtitle">
              <img src="/images/plant02.png" />
              You already nailed it!
            </h4>
            {this.state.userAchievements.map((achievement, i) => {
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
