import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import "./styles/GoalsEdit.css";

class GoalsEdit extends Component {
  state = {
    achievement: null,
  };

  componentDidMount() {
    let id = this.props.match.params.achievementID;
    console.log(id);

    axios
      .patch(`${API_URL}/achievements/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          achievement: res.data,
        });
      });
  }

  handleImageChange = (e) => {
    let uploadData = new FormData();
    uploadData.append("imageUrl", e.currentTarget.files[0]);

    axios
      .post(`${API_URL}/upload`, uploadData, { withCredentials: true })
      .then((response) => {
        let updatedAchievement = JSON.parse(
          JSON.stringify(this.state.achievement)
        );
        updatedAchievement.image = response.data.image;
        this.setState({
          achievement: updatedAchievement,
        });
      });
  };

  handleDateChange = (e) => {
    let updatedAchievement = JSON.parse(JSON.stringify(this.state.achievement));
    updatedAchievement.finishing_date = e.currentTarget.value;
      this.setState({
        achievement: updatedAchievement,
      });
  }

  render() {
    if (!this.state.achievement) {
      return (
        <p>
          Loading... If you're not login yet, please{" "}
          <Link to="/login">click on this link</Link>
        </p>
      );
    }

    const { image, challenge } = this.state.achievement;

    return (
      <div id="editGoal">
        <h3 className="title">Complete this Goal</h3>
        <div className="white-card">
          <div className="header">
            <h4>{challenge.title}</h4>
            <p>{challenge.points} points</p>
          </div>

          <h5 className="subtitle">
              {" "}
              <img src="/images/plant02.png" alt="o"  /> How to complete this goal?
            </h5>
          <p>{challenge.description}</p>
          <h5 className="subtitle">
              {" "}
              <img src="/images/plant02.png" alt="o"  /> Before you valid this goal
            </h5>
          <label htmlFor="image">1. Download a picture :</label>
          {image ? <img src={image} alt="Avatar" /> : ""}
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg"
            onChange={this.handleImageChange}
          ></input>
          <label htmlFor="finishing_date">2. When did you finish this task ?</label>
          <input name="finishing_date" type="date" onChange={this.handleDateChange} />

          <div className="edit-btn">
              <button onClick={() => this.props.onUpdate(this.state.achievement)}
            type="submit">
                <img src="/images/valid.png" alt="Valid" /> Completed !
              </button>
          </div>
        </div>
      </div>
    );
  }
}

export default GoalsEdit;
