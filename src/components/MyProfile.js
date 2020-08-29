import React, { Component } from "react";
import { Link } from "react-router-dom";
import ExperienceBar from "./ExperienceBar";
import axios from "axios";
import { API_URL } from "../config";
import "./styles/MyProfile.css"

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
      return <p>Loading... If you're not login yet, please <Link to='/login'>click on this link</Link></p>;
    }

    return (
      <div className="bgImg">
        <h3 className="title">Your Profile</h3>
        <div className="white-card">
          <div className="header">
            <div>
              <img
                src={this.props.loggedInUser.image}
                alt="Avatar"
                style={{ width: "100px" }}
              />
              <p>{this.props.loggedInUser.username}</p>
              <p>{this.props.loggedInUser.rank} - {this.props.loggedInUser.points} points</p>
            </div>
            <Link to="/profile/edit">Edit</Link>
          </div>

          <ExperienceBar loggedInUser={this.props.loggedInUser} />

          <div>
            <h5>Achievements</h5>
            {this.state.userAchievements.map((achievement, i) => {
              if (achievement.completed) {
                return <Link to={`/achievement/${achievement._id}`}><p key={"success" + i}>{achievement.challenge.title}</p></Link>;
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default MyProfile;
