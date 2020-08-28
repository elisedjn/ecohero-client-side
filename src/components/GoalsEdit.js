import React, { Component } from 'react'
import axios from "axios";
import { API_URL } from "../config";
import { Link } from "react-router-dom";



class GoalsEdit extends Component {

    state = {
        achievement: null,
      };

      componentDidMount() {
        let id = this.props.match.params.achievementID
        console.log(id)

          axios.patch(`${API_URL}/achievements/${id}`, {
              withCredentials: true,
            })
            .then((res) => {
                console.log(res.data)
              this.setState({
                achievement: res.data,
              });
            });
      }

      handleImageChange = (e) => {
        let uploadData = new FormData();
        uploadData.append("imageUrl", e.currentTarget.files[0]);
    
        axios.post(`${API_URL}/upload`, uploadData, { withCredentials: true })
          .then((response) => {
            let updatedUser = JSON.parse(JSON.stringify(this.state.user));
            updatedUser.image = response.data.image;
            this.setState({
              user: updatedUser,
            });
          });
      };


    render() {
        if (!this.state.userAchievements || !this.props.loggedInUser) {
            return <p>Loading... If you're not login yet, please <Link to='/login'>click on this link</Link></p>;
          }

          const {image} = this.state.achievement;

        return (
            <div>
                <h4>{this.state.achievement.challenge.title}</h4>
                    <p>{this.state.achievement.challenge.points} points</p>
                    <h5>Description</h5>
                    <p>{this.state.achievement.challenge.description}</p>
                    <p>{this.state.achievement.challenge.fact}</p>

                <img src={image} alt="Avatar" />
                <label htmlFor="image">Change your profile picture:</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/png, image/jpeg"
                    onChange={this.handleImageChange}
                ></input>
                <p>{this.state.achievement.challenge.finishing_date}</p>
        

                <button onClick={() => this.props.onEdit(this.state.user)} type="submit">Completed!</button>
            </div>
        )
    }
}


export default GoalsEdit
