import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import AddToMyGoals from "./AddToMyGoals";
import Loading from "./Loading"
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
      return <Loading/>;
    }
    return (
      <div id="challengeDetails">
        <div className="white-card">
          <a href="/challenges"><img src="/images/back.png" alt="Back" className="back-btn"/></a>
          <div className="header">
            <h4 className="challengeDetailTitle">{this.state.challenge.title}</h4>
            <p>{this.state.challenge.points} points</p>
          </div>
          <h5 className="subtitle">
          <img src="/images/plant02.png" alt="o" />How to complete this goal?
          </h5>
          <p>{this.state.challenge.description}</p>
          <h5 className="subtitle">
          <img src="/images/plant02.png" alt="o"  />Why is it helpful?
          </h5>
          <p>{this.state.challenge.fact}</p>

          {
            this.props.loggedInUser ? (
              <div className="addGoalBtn">
                <AddToMyGoals challenge={this.state.challenge._id} onSuccess={this.props.onSuccess}/>
              </div>
            ) : ""
          }
      
        </div>       
      </div>
    );
  }
}

export default ChallengeDetails;
