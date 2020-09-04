import React, { Component } from "react";
import { Link } from "react-router-dom";
import ExperienceBar from "./ExperienceBar";
import axios from "axios";
import { API_URL } from "../config";
import Loading from "./Loading"
import "./styles/OtherProfile.css";

export default class OtherProfile extends Component {
  state = {
    user: null,
    userAchievements: [],
    userGroups: null,
  };

  componentDidMount() {
    let id = this.props.match.params.userID;
    axios
      .get(`${API_URL}/users/${id}`, { withCredentials: true })
      .then((user) => {
        axios
          .get(`${API_URL}/achievements/user/${user.data._id}`, {
            withCredentials: true,
          })
          .then((achiev) => {
            axios
          .get(`${API_URL}/groups/user/${user.data._id}`, {
            withCredentials: true,
          })
            .then((groups) => {
              this.setState({
                user: user.data,
                userAchievements: achiev.data,
                userGroups: groups.data
              });
            })
          });
      });
  }

  render() {
    if (!this.state.userAchievements || !this.state.user) {
      return <Loading/>
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
            <img src="/images/plant02.png" alt="o" />
            Success</h4>
            {this.state.userAchievements.map((achievement, i) => {
              if (achievement.completed) {
                let finishDate = new Date(achievement.finishing_date)
                let date = "0" + finishDate.getDate()
                let month = "0" + (finishDate.getMonth() + 1)
                let finish = date.slice(-2) + "/" + month.slice(-2)
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
            {this.state.userGroups.map((event, i) => {
              if (event.finished) {
                let eventDate = new Date(event.date)
                let date = "0" + eventDate.getDate()
                let month = "0" + (eventDate.getMonth() + 1)
                eventDate = date.slice(-2) + "/" + month.slice(-2)
                return (
                  <div className="one-success event" key={"event" + i}>
                    <Link to={`/groups/${event._id}`}>
                        <p>{eventDate}</p>
                        <h6>{event.name}</h6>
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
