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
      return <p>Loading... If you're not login yet, please <Link to='/login'>click on this link</Link></p>;
    }

    return (
      <div>
        <h3>Your Profile</h3>
        <div>
          <img
            src={this.props.loggedInUser.image}
            alt="Avatar"
            style={{ width: "100px" }}
          />
          <p>{this.props.loggedInUser.username}</p>
          <p>
            {this.props.loggedInUser.rank} - {this.props.loggedInUser.points}{" "}
            points
          </p>
          <Link to="/profile/edit">Edit</Link>
        </div>

        <ExperienceBar loggedInUser={this.props.loggedInUser} />

        <div>
          <h5>Achievements</h5>
          {this.state.userAchievements.map((achievement, i) => {
            if (achievement.completed) {
              return <p key={"success" + i}>{achievement.challenge.title}</p>;
            }
          })}
        </div>
      </div>
    );
  }
}

export default Profile;
