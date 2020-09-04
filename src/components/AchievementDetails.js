import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import AddToMyGoals from "./AddToMyGoals";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import SocialMedia from "./SocialMedia"
import Loading from "./Loading"
import "./styles/AchievementDetails.css";

class AchievementDetails extends Component {
  state = {
    achievement: null,
    showDeletePopup: false,
  };

  componentDidMount() {
    let id = this.props.match.params.achievementID;
    axios.get(`${API_URL}/achievements/${id}`, {withCredentials: true}).then((res) => {
      this.setState({
        achievement: res.data,
      });
    });
  }

  handleClick = () => {
    this.setState({
      showDeletePopup: true
    })
  }

  handleClose = () => {
    this.setState({
      showDeletePopup:false
    })
  }

  handleDelete = () => {
    axios.delete(`${API_URL}/achievements/${this.state.achievement._id}`, {withCredentials: true})
      .then((res) => {
        this.props.history.push('/goals-success')
      })
  };

  render() {
    if (!this.state.achievement) {
      return <Loading/>;
    }
    const {challenge, completed, user, image, finishing_date, starting_date, _id} = this.state.achievement
    let startDate = new Date(starting_date);
    let start = startDate.toLocaleDateString();
    let finishDate = new Date(finishing_date);
    let finish = finishDate.toLocaleDateString();
    return (
      <div id="achievDetails">
        <div className="white-card">
            {
              !this.props.loggedInUser || this.props.loggedInUser._id !== user._id ? <Link to={`/user/${user._id}`} className="back-link">{user.username}'s profile</Link> : ""
            }
          <div className="header">
            <h4>{challenge.title}</h4>
            <p>{challenge.points} points</p>
          </div>

          {!this.props.loggedInUser ? "" : (completed && this.props.loggedInUser._id === user._id) ? <div className="sharing-logos"><SocialMedia achievementID={_id}  /></div> : completed ? <div className="sharing-logos"><AddToMyGoals challenge={challenge._id} onSuccess={this.props.onSuccess} fromOther /></div> : ""}

          {!completed ? (
            <h5 className="subtitle">
              {" "}
              <img src="/images/plant02.png" alt="o" /> How to complete this
              goal?
            </h5>
          ) : this.props.loggedInUser && this.props.loggedInUser._id === user._id ? (
            <h5 className="subtitle">
              <img src="/images/plant02.png" alt="o" /> The task you fulfilled :{" "}
            </h5>
          ) : (
            <h5 className="subtitle">
              <img src="/images/plant02.png" alt="o" /> The task {user.username} fulfilled :{" "}
            </h5>
          ) }

          <p>{challenge.description}</p>
          <h5 className="subtitle">
            <img src="/images/plant02.png" alt="o" /> Why is it helpful?
          </h5>
          <p>{challenge.fact}</p>
          <p className="date">
            <strong>Started :</strong> {start}
          </p>
          {completed ? (
            <>
              <p className="date">
                <strong>Finished :</strong> {finish}
              </p>
              <img
                className="d-block achiev-image"
                src={image}
                alt="Uplaoded"
              />
            </>
          ) : (
            <div className="edit-btn">
              <Link to={`/goals-edit/${_id}`}>
                <img src="/images/valid.png" alt="Valid" /> Complete it
              </Link>
              <button onClick={this.handleClick}>
                <img src="/images/delete.png" alt="Delete" /> Delete it !
              </button>
            </div>
          )}
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
            <Button className="buttonYes"
              variant="success"
              onClick={this.handleDelete}
            >
              Yes, I'm sure!
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AchievementDetails;
