import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import Loading from "./Loading"
import "./styles/Leaderboard.css";

class Leaderboard extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    axios.get(`${API_URL}/users/leaderboard`).then((res) => {
      this.setState({
        users: res.data,
      });
    });
  }

  render() {
    if (!this.state.users) {
      return <Loading/>
    }

    return (
      <div id="leaderboard">
        <h3 className="HallTitle">Hall of Heroes</h3>
        <ol className="list">
          {this.state.users.map((user) => {
            const { username, points, _id } = user;
            return (
              <Link  className="listItems" to={`/user/${_id}`}>
                  <li>
                    {username} {points} points
                  </li> 
              </Link>
            );
          })}
        </ol>
      </div>
    );
  }
}

export default Leaderboard;
