import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {Link} from "react-router-dom";
import "./styles/ChallengesList.css";


class ChallengesList extends Component {
  state = {
    challenges: [],
    filteredChallenges: [],
    showPopUp: false
  };

  componentDidMount() {
    axios.get(`${API_URL}/challenges`).then((response) => {
      this.setState({
        challenges: response.data,
        filteredChallenges: response.data
      });
    });
  }

  handleSearch = (e) => {
    let search = e.currentTarget.value.toLowerCase()
    let cloneChallenges = this.state.challenges.filter((item) => {
      return (item.title.toLowerCase().includes(search) || item.description.toLowerCase().includes(search))
    })
    this.setState({
      filteredChallenges: cloneChallenges
    })
  }

  handleCreateClick = () => {
    if (!this.props.loggedInUser || this.props.loggedInUser.points < 25000) {
      this.setState({
        showPopUp: true
      })
    } else (
      this.props.history.push('/challenges/create')
    )
  }

 handleClose = () => {
   this.setState({
     showPopUp:false
   })
 }

  render() {
    if (!this.state.challenges) {
      return <div>Loading...</div>;
    }
    return (
      <div className="challenges">
      <h3 className="challengesTitle">Challenges</h3>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">&#128270;</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={this.handleSearch}
            placeholder="Search for a challenge"
            aria-label="Search for a challenge"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        {this.state.filteredChallenges.map((challenge, i) => {
          return (
            <div className="one-success-container">
              <div className="one-success" key={"challenge" + i}>
                <Link className="link" to={`/challenge/${challenge._id}`}><p>{challenge.title} - <strong>{challenge.points} points</strong></p></Link>
              </div>
            </div>
          );
        })}
        {
          this.props.loggedInUser ? (
            <Button className="bouncy" onClick={this.handleCreateClick}><img className="plantL" src="/plant02.png"/>Create a Challenge<img className="plantR" src="/plant.png"/></Button>
          ) : ''
        }
        <Modal show={this.state.showPopUp} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Not yet!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Achieve Smart Hero rank in order to do that	&#x1F609; </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Ok, got it
          </Button>
        </Modal.Footer>
      </Modal>

      </div>
    );
  }
}

export default ChallengesList;
