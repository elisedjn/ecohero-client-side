import React, { Component } from 'react'
import axios from "axios";
import { API_URL } from "../config";





class ChallengeDetails extends Component {

    state = {
        challenge: null,
      };

      componentDidMount() {
        let id = this.props.match.params.challengeID
        console.log(id)

          axios.get(`${API_URL}/challenges/${id}`, {
              withCredentials: true,
            })
            .then((res) => {
                console.log(res.data)
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
            <div>
                <h4>{this.state.challenge.title}</h4>
                <p>{this.state.challenge.points} points</p>
                <h5>Description</h5>
                <p>{this.state.challenge.description}</p>
                <p>{this.state.achievement.challenge.fact}</p>
        
                <div>
                    <button>Add</button>
                </div> 
            </div>
        )
    }
}






export default ChallengeDetails