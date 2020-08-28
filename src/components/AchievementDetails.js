import React, { Component } from 'react'
import axios from "axios";
import { API_URL } from "../config";





class AchievementDetails extends Component {

    state = {
        achievement: null,
      };

      componentDidMount() {
        let id = this.props.match.params.achievementID
        console.log(id)

          axios.get(`${API_URL}/achievements/${id}`, {
              withCredentials: true,
            })
            .then((res) => {
                console.log(res.data)
              this.setState({
                achievement: res.data,
              });
            });
      }


    render() {
       
        if (!this.state.achievement) {
            return <p>Loading...</p>;
          }
        return (
            <div>
                <h4>{this.state.achievement.challenge.title}</h4>
                <p>{this.state.achievement.challenge.points}</p>
                <h5>Description</h5>
                <p>{this.state.achievement.challenge.description}</p>
                <img
                    className="d-block w-50"
                    src= {this.state.achievement.image}
                    alt= {this.state.achievement.challenge.title}
                    />
                <p>Started: {this.state.achievement.challenge.starting_date}</p>
                <p>Finished: {this.state.achievement.challenge.starting_date}</p>

                <div>
                    <button>Accept</button>
                    <button>Delete</button>
                </div> 
            </div>
        )
    }
}






export default AchievementDetails