import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Loading from "./Loading"
import "./styles/GoalsEdit.css";

class GoalsEdit extends Component {
  state = {
    achievement: null,
    showPopUp: false,
    popUpMessage: "If you complete this goal, it will directly go to your success and you won't be able to edit it again. Are you sure you are ready to complete this goal?",
    popUpHeader: "Are you sure?",
    buttonStyle: {},
    buttonText: "No, not yet."
  };

  componentDidMount() {
    let id = this.props.match.params.achievementID;

    axios
      .get(`${API_URL}/achievements/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
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

  handleClick = () => {
    if(!this.state.achievement.finishing_date){
      this.setState({
        showPopUp: true,
        popUpMessage: "Please enter a finishing date for this goal",
        popUpHeader: "Oops!",
        buttonStyle: {display:"none"},
        buttonText: "Ok, got it!"
      })
    } else {
      this.setState({
        showPopUp: true,
        popUpMessage: "If you complete this goal, it will directly go to your success and you won't be able to edit it again. Are you sure you are ready to complete this goal?",
        popUpHeader: "Are you sure?",
        buttonStyle: {},
        buttonText: "No, not yet."
      })
    }
  }

  handleClose = () => {
    this.setState({
      showPopUp: false
    })
  }

  fixTodayDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    if(dd<10)dd='0'+dd
    if(mm<10)mm='0'+mm
    return yyyy+'-'+mm+'-'+dd;
  }

  render() {
    if (!this.state.achievement) {
      return <Loading/>
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
          <input name="finishing_date" type="date" onChange={this.handleDateChange} max={this.fixTodayDate()} required/>
          <div className="edit-btn">
              <button onClick={this.handleClick}
            type="submit">
                <img src="/images/valid.png" alt="Valid" /> Completed !
              </button>
          </div>
        </div>
        <Modal className="modalContainer" show={this.state.showPopUp} onHide={this.handleClose}>
          <Modal.Header className="modalTitleContainer">
            <Modal.Title className="modalTitle">{this.state.popUpHeader}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalText">
            {this.state.popUpMessage}
          </Modal.Body>
          <Modal.Footer className="modalButtonsContainer">
          <Button className="buttonNo" variant="danger" onClick={this.handleClose} >
          {this.state.buttonText}
            </Button>
            <Button className="buttonYes" variant="success" onClick={() => this.props.onUpdate(this.state.achievement)} style={this.state.buttonStyle}>
              Yes I'm sure!
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}



export default GoalsEdit;
