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
            let updatedAchievement = JSON.parse(JSON.stringify(this.state.achievement));
            updatedAchievement.image = response.data.image;
            this.setState({
              achievement: updatedAchievement,
            });
          });
      };


    render() {
        if (!this.state.achievement) {
            return <p>Loading... If you're not login yet, please <Link to='/login'>click on this link</Link></p>;
          }

          const {image} = this.state.achievement;

        return (
            <div>
                <h4>{this.state.achievement.challenge.title}</h4>
                    <p>{this.state.achievement.challenge.points} points</p>
                    <h5>Description</h5>
                    <p>{this.state.achievement.challenge.description}</p>
                    <h5>Fact</h5>
                    <p>{this.state.achievement.challenge.fact}</p>

                <img src={image} alt="Avatar" />
                <label htmlFor="image">Download a picture:</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/png, image/jpeg"
                    onChange={this.handleImageChange}
                ></input>
                <label htmlFor="finishing_date">Change your profile picture:</label>
                <input name="finishing_date" type="date"/>
        

                <button onClick={() => this.props.onUpdate(this.state.achievement)} type="submit">Completed!</button>
            </div>
        )
    }
}


export default GoalsEdit
