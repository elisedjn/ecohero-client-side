import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import "./styles/ChallengesList.css";



class ChallengesList extends Component {
  state = {
    challenges: [],
    filteredChallenges: [],
    showPopUp: false,
  };

  componentDidMount() {
    axios.get(`${API_URL}/challenges`).then((response) => {
      this.setState({
        challenges: response.data,
        filteredChallenges: response.data,
      });
    });
  }

  handleSearch = (e) => {
    let search = e.currentTarget.value.toLowerCase();
    let cloneChallenges = this.state.challenges.filter((item) => {
      return (
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
      );
    });
    this.setState({
      filteredChallenges: cloneChallenges,
    });
  };

  handleCreateClick = () => {
    if (!this.props.loggedInUser || this.props.loggedInUser.points < 25000) {
      this.setState({
        showPopUp: true,
      });
    } else this.props.history.push("/challenges/create");
  };

  handleClose = () => {
    this.setState({
      showPopUp: false,
    });
  };

  handleSort = (e) => {
    e.preventDefault()
    let cloneChallenges = JSON.parse(JSON.stringify(this.state.filteredChallenges)) 
    e.currentTarget.value ==="low" ? cloneChallenges.sort((a, b) => a.points - b.points) : cloneChallenges.sort((a, b) => b.points - a.points)
    this.setState({
      filteredChallenges: cloneChallenges,
    })
  }

  render() {
    if (!this.state.challenges) {
      return <div>Loading...</div>;
    }
    return (
      <div id="challenges">
        <h3 className="challengesTitle">Challenges</h3>

        <div className="search-part">
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

        <Form.Control onChange={this.handleSort} as="select" defaultValue="Sort by...">
            <option>Sort by...</option>
            <option value="high">Points - high to low </option>
            <option value="low">Points - low to high</option>
          </Form.Control>
          {this.props.loggedInUser ? (
          <Button className="bouncy" onClick={this.handleCreateClick}>
            <img className="plantL" src="/images/plant02.png" alt="o" />
            Create a Challenge
          </Button>
        ) : (
          ""
        )}
        </div>
        
        {this.state.filteredChallenges.map((challenge, i) => {
          return (
            <div className="one-success-container" key={"challenge" + i}>
              <div className="one-success">
                <Link className="link" to={`/challenge/${challenge._id}`}>
                  <p>
                    {challenge.title} -{" "}
                    <strong>{challenge.points} points</strong>
                  </p>
                </Link>
              </div>
            </div>
          );
        })}
        <Modal show={this.state.showPopUp} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Not yet!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Achieve Smart Hero rank in order to do that &#x1F609;{" "}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={this.handleClose}>
              Ok, got it
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ChallengesList;
