import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import "./styles/AchievementDetails.css";

class AchievementDetails extends Component {
  state = {
    achievement: null,
  };

  componentDidMount() {
    let id = this.props.match.params.achievementID;
    axios.get(`${API_URL}/achievements/${id}`).then((res) => {
      this.setState({
        achievement: res.data,
      });
    });
  }

  render() {
    if (!this.state.achievement) {
      return <p>Loading...</p>;
    }
    let startDate = new Date(this.state.achievement.starting_date);
    let start = startDate.toLocaleDateString();
    let finishDate = new Date(this.state.achievement.finishing_date);
    let finish = finishDate.toLocaleDateString();
    return (
      <div id="achievDetails">
        <div className="white-card">
          <div className="header">
            <h4>{this.state.achievement.challenge.title}</h4>
            <p>{this.state.achievement.challenge.points} points</p>
          </div>

          {this.state.achievement.completed ? (
            <div className="sharing-logos">Sharing Logos</div>
          ) : (
            ""
          )}

          {this.state.achievement.completed ? (
            <h5 className="subtitle">
              <img src="/images/plant02.png" alt="o"  /> The task you fulfilled :{" "}
            </h5>
          ) : (
            <h5 className="subtitle">
              {" "}
              <img src="/images/plant02.png" alt="o"  /> How to complete this goal?
            </h5>
          )}
          <p>{this.state.achievement.challenge.description}</p>
          <h5 className="subtitle">
            <img src="/images/plant02.png" alt="o"  /> Why is it helpful?
          </h5>
          <p>{this.state.achievement.challenge.fact}</p>
          <p className="date"><strong>Started :</strong> {start}</p>
          {this.state.achievement.completed ? (
            <>
              <p className="date"><strong>Finished :</strong> {finish}</p>
              <img
                className="d-block achiev-image"
                src={this.state.achievement.image}
                alt="Uplaoded"
              />
            </>
          ) : (
            <div className="edit-btn">
              <Link to={`/goals-edit/${this.state.achievement._id}`}>
                <img src="/images/valid.png" alt="Valid" /> Complete it
              </Link>
              <a href="/">
                <img src="/images/delete.png" alt="Delete" /> Delete it
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AchievementDetails;
