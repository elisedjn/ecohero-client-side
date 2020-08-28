import React, { Component } from "react";
import { Link } from "react-router-dom";
import ExperienceBar from "./ExperienceBar";
import axios from "axios";
import { API_URL } from "../config";

export default class OtherProfile extends Component {
  state = {
    user: null,
    userAchievements: [],
  };

  componentDidMount() {
    let id = this.props.match.params.userID
    axios.get(`${API_URL}/users/${id}`,{ withCredentials: true})
      .then((user) => {
        console.log(user.data)
        axios.get(`${API_URL}/achievements/user/${user.data._id}`, {withCredentials: true})
        .then((res) => {
          this.setState({
            user: user.data,
            userAchievements: res.data,
          });
        });
      })  
  }

  render() {

    if (!this.state.userAchievements || !this.state.user) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <div>
          <img
            src={this.state.user.image}
            alt="Avatar"
            style={{ width: "100px" }}
          />
          <h3>{this.state.user.username}</h3>
          <p>
            {this.state.user.rank} - {this.state.user.points}{" "}
            points
          </p>
        </div>

        <ExperienceBar loggedInUser={this.state.user} />

        <div>
          <h5>Achievements</h5>
          {this.state.userAchievements.map((achievement, i) => {
            if (achievement.completed) {
              return <Link to={`/achievement/${achievement._id}`}><p key={"success" + i}>{achievement.challenge.title}</p></Link>;
            }
          })}
        </div>
      </div>
    );
  }
}
