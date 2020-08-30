import React, { Component } from "react";
import MyCarousel from "./MyCarousel";
import ExperienceBar from "./ExperienceBar";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import "./styles/HeroHome.css";

class HeroHome extends Component {
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
      <div id="heroHome">
        <h3 className="title">Hero Home</h3>
        <div className="white-card">
          <div className="header">
            <img src={this.props.loggedInUser.image} alt="Avatar" />
            <div>
              <div className="users-info">
                <h5>{this.props.loggedInUser.username}</h5>
                <Link to="/profile/edit">
                  <img src="/images/edit.png" alt="Edit" />
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
          <ExperienceBar loggedInUser={this.props.loggedInUser} />
          <div className="your-tasks">
            <h4>
              <img src="/images/plant02.png" />
              Your EcoHero Tasks
            </h4>
            <div>
              {this.state.userAchievements.map((achievement, i) => {
                if (!achievement.completed) {
                  let startDate = new Date(achievement.starting_date);
                  let date = startDate.getDate();
                  let month = startDate.getMonth() + 1;
                  let start = date + "/" + month;
                  return (
                    <div className="one-task" key={"goals" + i}>
                    <div className="date-title">
                      <Link to={`/achievement/${achievement._id}`}>
                        <p>{start}</p>
                        <h6>{achievement.challenge.title}</h6>
                      </Link>
                      </div>
                      <div className="edit-btn">
                        <Link to={`/goals-edit/${achievement._id}`}>
                          <img src="/images/valid.png" alt="Valid" />
                        </Link>
                        <a>
                          <img src="/images/delete.png" alt="Delete" />
                        </a>
                      </div>
                    </div>
                  );
                }
              })}
              <div className="btn-container">
            <Link className="btn-add" to="/challenges">Add one more !</Link>
            </div>
            </div>
          </div>
        </div>

        <div className="carousel-container">
          <h4 className="carousel-title">Get Inspired</h4>
          <MyCarousel />
        </div>
      </div>
    );
  }
}

export default HeroHome;
