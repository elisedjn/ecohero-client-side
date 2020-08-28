import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

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
      <div>
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
            <div key={"challenge" + i}>
              <h3>{challenge.title}</h3>
              <p>{challenge.points} points</p>
            </div>
          );
        })}
        {
          this.props.loggedInUser ? (
            <Button onClick={this.handleCreateClick}>Create a Challenge</Button>
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
