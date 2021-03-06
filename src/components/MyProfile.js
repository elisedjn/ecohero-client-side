import React, { Component } from "react";
import { Link } from "react-router-dom";
import ExperienceBar from "./ExperienceBar";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import { API_URL } from "../config";
import Loading from "./Loading"
import "./styles/MyProfile.css";

class MyProfile extends Component {
  state = {
    userAchievements: [],
    showDeletePopup: false,
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

  handleDeleteUser = () => {
    axios.delete(`${API_URL}/users/${this.props.loggedInUser._id}`, {withCredentials: true})
      .then((res) => {
        this.props.onDelete()
      })
  };


  render() {
    if (!this.state.userAchievements || !this.props.loggedInUser) {
      return <Loading/>
    }

    return (
      <div id="myProfile">
        <h3 className="title">Your Profile</h3>
        <div className="white-card">

          <div className="profilePic">
            <img src={this.props.loggedInUser.image} alt="Avatar" />
          </div>
             
            <div className="infoContainer">
              <div className="users-info">
                <p><strong>Name:</strong> {this.props.loggedInUser.username}</p>  
              </div>
              <div className="points-info">
                <p className="total-rank"><strong>Rank:</strong> {this.props.loggedInUser.rank} - {this.props.loggedInUser.points} points</p> 
              </div>
            </div>
          <ExperienceBar loggedInUser={this.props.loggedInUser} />
          

          <div className="edit-btn">
              <Link to="/profile/edit">
                <img src="/images/edit.png" alt="Valid" />Edit
              </Link>
              <button className="deleteUser" onClick={this.handleClick}>
                <img src="/images/delete.png" alt="Delete" />Delete
              </button>
          </div>
        </div>
        <Modal className="modalContainer" show={this.state.showDeletePopup} onHide={this.handleClose}>
          <Modal.Header className="modalTitleContainer">
            <Modal.Title className="modalTitle">Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalText">
            Are you sure you want to delete this account ?
          </Modal.Body>
          <Modal.Footer className="modalButtonsContainer">
            <Button className="buttonNo" variant="danger" onClick={this.handleClose}>
              No, not yet.
            </Button>
            <Button className="buttonYes"
              variant="success"
              onClick={this.handleDeleteUser}
            >
              Yes, I'm sure!
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default MyProfile;
