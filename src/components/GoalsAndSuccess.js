import React, { Component } from 'react'
import ExperienceBar from "./ExperienceBar";
import axios from "axios";
import { API_URL } from "../config";
import {Link} from "react-router-dom";






class GoalsAndSuccess extends Component {

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
            return <p>Loading... If you're not login yet, please <Link to='/login'>click on this link</Link></p>;
          }
      


        return (
            <div>
            <ExperienceBar loggedInUser = {this.props.loggedInUser}/>
            <h4>Your Goals & Achievements</h4>
                <div>
                    <h5>Challenges</h5>
                    {this.state.userAchievements.map((achievement) => {
                      if (!achievement.completed) {
                        return <p>{achievement.challenge.title}</p>;
                    }
                  })}
                </div>

                <div>
                    <h5>Achievements</h5>
                    {this.state.userAchievements.map((achievement) => {
                    if (achievement.completed) {
                        return <p>{achievement.challenge.title}</p>;
                    }
                    })}
                </div>
            </div>
        )
    }
}



export default GoalsAndSuccess
