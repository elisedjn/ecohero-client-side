import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import "./styles/GroupEdit.css";

class GroupEdit extends Component {
  state = {
    event: null,
    showPopUp: false,
  };

  componentDidMount() {
    let id = this.props.match.params.eventID;
    axios.get(`${API_URL}/groups/${id}`, {withCredentials: true,})
      .then((res) => {
        this.setState({
          event: res.data,
        });
      });
  }

  handleImageChange = (e) => {
    let uploadData = new FormData();
    uploadData.append("imageUrl", e.currentTarget.files[0]);

    axios
      .post(`${API_URL}/upload`, uploadData, { withCredentials: true })
      .then((response) => {
        let updatedEvent = JSON.parse(
          JSON.stringify(this.state.event)
        );
        updatedEvent.image = response.data.image;
        this.setState({
          event: updatedEvent,
        });
      });
  };

  handleClick = () => {
    this.setState({
      showPopUp: true
    })
  }

  handleClose = () => {
    this.setState({
      showPopUp: false
    })
  }

  render() {
    if (!this.state.event) {
      return (
        <p>
          Loading... If you're not login yet, please{" "}
          <Link to="/login">click on this link</Link>
        </p>
      );
    }

    const { name, challenge, members, date, image } = this.state.event;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    let fullDate = new Date(date).toLocaleDateString(undefined, options)

    return (
      <div id="editEvent">
        <h3 className="title">Validate this Event</h3>
        <div className="white-card">
          <div className="header">
            <h4>{name}</h4>
            <p>{fullDate}</p>
          </div>

          <h5 className="subtitle">
              {" "}
              <img src="/images/plant02.png" alt="o"  /> How to validate this event?
            </h5>
          <p>{challenge.description}</p>
          <h5 className="subtitle">
              {" "}
              <img src="/images/plant02.png" alt="o"  /> Before you valid this event
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
          <label htmlFor="finishing_date">2. Who participates to this event ?</label>
          {
            members.map((member, i) => {
              return (
                <div key={"member" + i} className="check-box">
                  <div> - {member.username}</div>
                </div>
              )
            })
          }
          
          <div className="edit-btn">
              <button onClick={this.handleClick}
            type="submit">
                <img src="/images/valid.png" alt="Valid" /> Validate !
              </button>
          </div>
        </div>
        <Modal className="modalContainer" show={this.state.showPopUp} onHide={this.handleClose}>
          <Modal.Header className="modalTitleContainer">
            <Modal.Title className="modalTitle">Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalText">
            If you valid this event, it will directly go to every participants success and you won't be able to edit it again. Are you sure you are ready to complete this event?
          </Modal.Body>
          <Modal.Footer className="modalButtonsContainer">
          <Button className="buttonNo" variant="danger" onClick={this.handleClose}>
              No, not yet.
            </Button>
            <Button className="buttonYes" variant="success" onClick={() => this.props.onUpdate(this.state.event)}>
              Yes, I'm sure!
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}



export default GroupEdit;
