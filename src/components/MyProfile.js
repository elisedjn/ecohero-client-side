import React, { Component } from "react";
import { Link } from "react-router-dom";
import ExperienceBar from "./ExperienceBar";
// import ProgressBar from "./ProgressBar"
// import styled from "styled-components"
import axios from "axios";
import { API_URL } from "../config";
import "./styles/MyProfile.css";



// const AppWrapper = styled.div`
// display: flex;
// justify-content: center;
// `;

// const ProgressBarContainer = styled.div`
// width: 150px;
// `;



class MyProfile extends Component {
  
    state = {
      userAchievements: [],
      // percentage: 0
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
          <div className="header">
            <img src={this.props.loggedInUser.image} alt="Avatar" />
            <div>
              <div className="users-info">
                <h5>{this.props.loggedInUser.username}</h5>
                <Link to="/profile/edit">
                  <img src="/edit.png" alt="Edit" />
                </Link>
              </div>
              <div className="points-info">
                <p className="total-rank">{this.props.loggedInUser.rank}</p>
                <p className="total-points">
                  - {this.props.loggedInUser.points} points
                </p>
              </div>
            </div>
          </div>

         {/* <AppWrapper>
           <ProgressBarContainer>
           <button onClick={() => this.setState({percentage: this.state.percentage + 10})}>+</button>
           <button onClick={() => this.setState({percentage: this.state.percentage - 10})}>-</button>
             <ProgressBar percentage={this.state.percentage} />
           </ProgressBarContainer>
         </AppWrapper> */}
            
          <ExperienceBar loggedInUser={this.props.loggedInUser} />

          <div className="your-success">
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

export default MyProfile;
