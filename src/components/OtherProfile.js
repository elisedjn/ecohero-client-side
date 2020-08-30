import React, { Component } from "react";
import { Link } from "react-router-dom";
import ExperienceBar from "./ExperienceBar";
import axios from "axios";
import { API_URL } from "../config";
import "./styles/OtherProfile.css";

export default class OtherProfile extends Component {
  state = {
    user: null,
    userAchievements: [],
  };

  componentDidMount() {
    let id = this.props.match.params.userID;
    axios
      .get(`${API_URL}/users/${id}`, { withCredentials: true })
      .then((user) => {
        console.log(user.data);
        axios
          .get(`${API_URL}/achievements/user/${user.data._id}`, {
            withCredentials: true,
          })
          .then((res) => {
            this.setState({
              user: user.data,
              userAchievements: res.data,
            });
          });
      });
  }

  render() {
    if (!this.state.userAchievements || !this.state.user) {
      return <p>Loading...</p>;
    }

    return (
      <div id="otherProfile">
        <div className="white-card">
          <div className="header">
            <img
              src={this.state.user.image}
              alt="Avatar"
              style={{ width: "100px" }}
            />
            <div>
              <div className="users-info">
                <h5>{this.state.user.username}</h5>
              </div>
              <div className="points-info">
                <p className="total-rank">{this.state.user.rank}</p>
                <p className="total-points">
                  - {this.state.user.points} points
                </p>
              </div>
            </div>
          </div>

          <ExperienceBar loggedInUser={this.state.user} />

          <div className="user-success">
            <h4>
            <img src="/plant02.png" />
            Success</h4>
            {this.state.userAchievements.map((achievement, i) => {
              if (achievement.completed) {
                let finishDate = new Date(achievement.finishing_date)
                let date = finishDate.getDate()
                let month = finishDate.getMonth() + 1
                let finish = date + "/" + month
                return (
                  <div className="one-success" key={"success" + i}>
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
