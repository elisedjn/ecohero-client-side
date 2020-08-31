import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import Button from "react-bootstrap/Button";
import {withRouter} from 'react-router-dom';
import "./styles/AddToMyGoals.css";

class AddToMyGoals extends Component {
  state = {
    loggedInUser: null,
    userGoals: []
  };

  componentDidMount() {
    if (!this.state.loggedInUser) {
      axios
        .get(`${API_URL}/auth/user`, { withCredentials: true })
        .then((res) => {
          axios.get(`${API_URL}/users/${res.data._id}`, { withCredentials: true })
            .then((user) => {
              axios.get(`${API_URL}/achievements/user/${user.data._id}`, { withCredentials: true })
                .then((achiev) => {
                  let goals = achiev.data.filter(e => e.completed === false)
                  console.log(goals)
                  this.setState({
                    loggedInUser: user.data,
                    userGoals : goals
                  });
                })
            })
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
    return <Button className="addThisGoalBtn" onClick={this.handleClick}>
           <img src="/images/valid.png" alt="Valid" />
           Add this Goal!
           </Button>;
  }
}

export default withRouter(AddToMyGoals);
