import React, { Component } from "react";
import { Link } from "react-router-dom";
import ExperienceBar from "./ExperienceBar";
import axios from "axios";
import { API_URL } from "../config";

class Profile extends Component {
  state = {
    userAchievements: [],
  };

  componentDidMount() {
    axios.get(`${API_URL}/achievements/user/${this.props.loggedInUser._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        this.setState({
          userAchievements: res.data,
        });
      });
  }

  render() {
    if (!this.state.userAchievements) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h3>Your Profile</h3>
        <div>
          {/* <img src={} alt="default pic"/> */}
          <p>{this.props.loggedInUser.username}</p>
          <p>{this.props.loggedInUser.rank} - {this.props.loggedInUser.points} points</p>
          <Link to={`/users/${this.props.loggedInUser._id}/edit`}>Edit</Link>
        </div>

        <ExperienceBar loggedInUser = {this.props.loggedInUser}/>

        <div>
          <h5>Achievements</h5>
          {this.state.userAchievements.map((achievement) => {
            if (achievement.completed) {
              return <p>{achievement.challenge.title}</p>;
            }
          })}
        </div>
      </div>
    );
  }
}

export default Profile;
