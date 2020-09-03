import React, { Component } from "react";
import MyCarousel from "./MyCarousel";
import ExperienceBar from "./ExperienceBar";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Loading from "./Loading"
import "./styles/HeroHome.css";

class HeroHome extends Component {
  state = {
    userAchievements: [],
    showDeletePopup: false,
    targetedAchievID: null

  };

  

  getUserAchievements = () => {
    axios
        .get(`${API_URL}/achievements/user/${this.props.loggedInUser._id}`, {
          withCredentials: true,
        })
        .then((res) => {
          let filterArr = res.data.filter(elem => elem.completed === false)
          this.setState({
            userAchievements: filterArr,
          });
        });
  }

  componentDidMount() {
    if (this.props.loggedInUser) {
      this.getUserAchievements()
    }
  }

  componentDidUpdate(newProps) {
    if (!newProps.loggedInUser) {
      this.getUserAchievements()
    }
  }

  handleClick = (achievID) => {
    this.setState({
      showDeletePopup: true,
      targetedAchievID: achievID
    })
  }

  handleClose = () => {
    this.setState({
      showDeletePopup:false
    })
  }

  handleDelete = (achievID) => {
    axios.delete(`${API_URL}/achievements/${achievID}`, {withCredentials: true})
      .then((res) => {
        let clonedUserAchiev = JSON.parse(JSON.stringify(this.state.userAchievements))
        clonedUserAchiev.forEach((e, i) => {
          if(e._id === res.data._id)  clonedUserAchiev.splice(i, 1)
        })
        console.log(clonedUserAchiev)
        this.setState({
          userAchievements: clonedUserAchiev,
          showDeletePopup:false
        })
      })
  };

  render() {
    if (!this.state.userAchievements || !this.props.loggedInUser) {
      return <Loading/>
    }
    return (
      <div id="heroHome">
        <h3 className="title">Hero Home</h3>
        <div className="white-card">
          <div className="header">
            <img src={this.props.loggedInUser.image} alt="Avatar" />
            <div>
              <div className="users-info">
                <h5 className="userName">{this.props.loggedInUser.username}</h5>
              </div>
              <div className="points-info">
                <p className="total-rank">{this.props.loggedInUser.rank}</p>
                <p className="total-points">
                  - {this.props.loggedInUser.points} points
                </p>
              </div>
            </div>
          </div>
          <ExperienceBar loggedInUser={this.props.loggedInUser} />
          <div className="your-tasks">
            <h4>
              <img src="/images/plant02.png" alt="o"  />
              Your EcoHero Tasks
            </h4>
            <div>
              {
                this.state.userAchievements.length === 0 ? <div>You don't have any goal set yet... </div> : ""
              }
              {
                this.state.userAchievements.slice(0, 2).map((achievement, i) => {
               
                  let startDate = new Date(achievement.starting_date);
                  let date = "0" + startDate.getDate();
                  let month = "0" + (startDate.getMonth() + 1);
                  let start = date.slice(-2) + "/" + month.slice(-2);
                  return (
                    <div className="one-task" key={"goals" + i}>
                    <div className="date-title">
                      <Link to={`/achievement/${achievement._id}`}>
                        <p>{start}</p>
                        <h6>{achievement.challenge.title}</h6>
                      </Link>
                      </div>
                      <div className="edit-btn">
                        <Link to={`/goals-edit/${achievement._id}`}>
                          <img src="/images/valid.png" alt="Valid" />
                        </Link>
                        <button
                        onClick={() => this.handleClick(achievement._id)}
                      >
                        <img src="/images/delete.png" alt="Delete" />
                      </button>
                      </div>
                    </div>
                  );
                
              })}
              <div className="btn-container">
              {
                this.state.userAchievements.filter(e => e.completed === false).length > 2 ? <div className="see-all"> <Link to="/goals-success" > See all my goals</Link> </div> : ""
              }
              <Link className="btn-add" to="/challenges">Add one more !</Link>
            </div>
            </div>
          </div>
        </div>

        <div className="carousel-container">
          <h4 className="carousel-title">Get Inspired</h4>
          <MyCarousel />
        </div>

        <Modal className="modalContainer" show={this.state.showDeletePopup} onHide={this.handleClose}>
          <Modal.Header className="modalTitleContainer">
            <Modal.Title className="modalTitle">Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalText">
            Are you sure you want to delete this goal from your list ?
          </Modal.Body>
          <Modal.Footer className="modalButtonsContainer">
          <Button className="buttonNo" variant="danger" onClick={this.handleClose}>
              No, not yet.
            </Button>
            <Button className="buttonYes" variant="success" onClick={() => this.handleDelete(this.state.targetedAchievID)}>
              Yes, I'm sure!
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default HeroHome;
