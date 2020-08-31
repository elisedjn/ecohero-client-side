import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import AddToMyGoals from "./AddToMyGoals";
import "./styles/ChallengeDetails.css";

class ChallengeDetails extends Component {
  state = {
    challenge: null,
  };

  componentDidMount() {
    let id = this.props.match.params.challengeID;
    axios.get(`${API_URL}/challenges/${id}`, { withCredentials: true, })
      .then((res) => {
        this.setState({
          challenge: res.data,
        });
      });
  }

  render() {
    if (!this.state.challenge) {
      return <p>Loading...</p>;
    }
    return (
      <div id="challengeDetails">
        <div className="white-card">
          <div className="header">
            <h4 className="challengeDetailTitle">{this.state.challenge.title}</h4>
            <p>{this.state.challenge.points} points</p>
          </div>
          <h5 className="subtitle">
          <img src="/images/plant02.png" />How to complete this goal?
          </h5>
          <p>{this.state.challenge.description}</p>
          <h5 className="subtitle">
          <img src="/images/plant02.png" />Why is it helpful?
          </h5>
          <p>{this.state.challenge.fact}</p>
          <div className="addGoalBtn">
            <AddToMyGoals challenge={this.state.challenge._id} />
          </div>
        </div>       
      </div>
    );
  }
}

export default ChallengeDetails;
