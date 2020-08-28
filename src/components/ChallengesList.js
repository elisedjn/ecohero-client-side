import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

class ChallengesList extends Component {
  state = {
    challenges: [],
    filteredChallenges: []
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
              <p>{challenge.description}</p>
              <p>{challenge.points} points</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ChallengesList;
