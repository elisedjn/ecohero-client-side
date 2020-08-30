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
          <h4 className="subtitle">
            <img src="/plant02.png" />
            Your EcoHero Tasks
          </h4>
          {this.state.userAchievements.map((achievement) => {
            if (!achievement.completed) {
              return (
                <div>
                  <Link to={`/achievement/${achievement._id}`}>
                    <p>{achievement.challenge.title}</p>
                  </Link>
                  <Link to={`/goals-edit/${achievement._id}`}>Edit</Link>
                </div>
              );
            }
          })}
        </div>

        <div>
          <h4 className="subtitle">
            <img src="/plant02.png" />
            You already nailed it!
          </h4>
          {this.state.userAchievements.map((achievement) => {
            if (achievement.completed) {
              return (
                <Link to={`/achievement/${achievement._id}`}>
                  <p>{achievement.challenge.title}</p>
                </Link>
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default GoalsAndSuccess;
