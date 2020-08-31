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
      <div id="myProfile">
        <h3 className="title">Your Profile</h3>
        <div className="white-card">

          <div className="profilePic">
            <img src={this.props.loggedInUser.image} alt="Avatar" />
          </div>
             
            <div className="infoContainer">
              <div className="users-info">
                <p><strong>Name:</strong> {this.props.loggedInUser.username}</p>  
              </div>
              <div className="points-info">
                <p className="total-rank"><strong>Rank:</strong> {this.props.loggedInUser.rank} - {this.props.loggedInUser.points} points</p> 
              </div>
            </div>
          <ExperienceBar loggedInUser={this.props.loggedInUser} />
          

          <div className="edit-btn">
              <Link to="/profile/edit">
                <img src="/images/edit.png" alt="Valid" />Edit
              </Link>
              <a>
                <img src="/images/delete.png" alt="Delete" />Delete
              </a>
          </div>

        </div>
      </div>
    );
  }
}

export default MyProfile;
