import React, { Component } from 'react'
import axios from "axios";
import { API_URL } from "../config";
import AddToMyGoals from './AddToMyGoals';





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
      console.log(this.state.challenge)
       
        if (!this.state.challenge) {
             return <p>Loading...</p>;
           }
        return ( 
            <div>
                <h4>{this.state.challenge.title}</h4>
                <p>{this.state.challenge.points} points</p>
                <h5>Description</h5>
                <p>{this.state.challenge.description}</p>
                <h5>Fact</h5>
                <p>{this.state.challenge.fact}</p>
        
                <div>
                    <AddToMyGoals challenge={this.state.challenge._id} />
                </div> 
            </div>
        )
    }
}






export default ChallengeDetails