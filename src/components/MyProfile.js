import React, { Component } from "react";
import { Link } from "react-router-dom";
import ExperienceBar from "./ExperienceBar";
import axios from "axios";
import { API_URL } from "../config";
import "./styles/MyProfile.css";

class MyProfile extends Component {
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
      <div className="bgImg">
        <h3 className="title">Your Profile</h3>
        <div className="white-card">
          <div className="header">
            <img src={this.props.loggedInUser.image} alt="Avatar" />
            <div>
              <div className="usersInfo">
                <h5>{this.props.loggedInUser.username}</h5>
                <Link to="/profile/edit">
                  <img src="/edit.png" alt="Edit" />
                </Link>
              </div>
              <div className="pointsInfo">
                <p className="totalRank">{this.props.loggedInUser.rank}</p>
                <p className="totalPoints">
                  - {this.props.loggedInUser.points} points
                </p>
              </div>
            </div>
          </div>

          <ExperienceBar loggedInUser={this.props.loggedInUser} />

          <div className="yourSuccess">
            <h4>
              <img src="/plant02.png" />
              Your Success
            </h4>
            {this.state.userAchievements.map((achievement, i) => {
              if (achievement.completed) {
                let finishDate = new Date(achievement.finishing_date)
                let date = finishDate.getDate()
                let month = finishDate.getMonth() + 1
                let finish = date + "/" + month
                return (
                  <div className="oneSuccess" key={"success" + i}>
                    <Link to={`/achievement/${achievement._id}`}>
                        <p>{finish}</p>
                        <h6>{achievement.challenge.title}</h6>
                    </Link>
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

export default MyProfile;
