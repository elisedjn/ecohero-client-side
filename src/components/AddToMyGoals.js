import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import Button from "react-bootstrap/Button";
import {withRouter} from 'react-router-dom';

class AddToMyGoals extends Component {
  state = {
    loggedInUser: null,
  };

  componentDidMount() {
    if (!this.state.loggedInUser) {
      axios.get(`${API_URL}/auth/user`, { withCredentials: true })
        .then((res) => {
          this.setState({
            loggedInUser: res.data,
          });
        });
    }
  }

  handleClick = () => {
    axios.post(
        `${API_URL}/achievements/create/${this.props.challenge}/${this.state.loggedInUser._id}`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        this.props.history.push('/goals-success')
      });
  }

  render() {
    return <Button onClick={this.handleClick}> Do this challenge!</Button>;
  }
}

export default withRouter(AddToMyGoals);
