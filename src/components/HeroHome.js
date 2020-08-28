import React, { Component } from "react";
import MyCarousel from "./MyCarousel";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

class HeroHome extends Component {
  state = {
    userAchievements: [],
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

  render() {

    if (!this.state.userAchievements || !this.props.loggedInUser) {
      return <p>Loading... If you're not login yet, please <Link to='/login'>click on this link</Link></p>;
    }
    return (
      <div>
        <h3>Hero Home</h3>
        <div>
          <img
            src={this.props.loggedInUser.image}
            alt="Avatar"
            style={{ width: "100px" }}
          />
          <p>{this.props.loggedInUser.username}</p>
          <p>
            {this.props.loggedInUser.rank} - {this.props.loggedInUser.points}{" "}
            points
          </p>
          <Link to="/profile/edit">Edit</Link>
          <h5>Your EcoHero tasks</h5>
          <div>
            {this.state.userAchievements.map((achievement, i) => {
              if (!achievement.completed) {
                return <p key={"goals" + i}>{achievement.challenge.title}</p>;
              }
            })}
          </div>
        </div>

        <div>
          <h4>Get Inspired</h4>
          <MyCarousel />
        </div>
      </div>
    );
  }
}

export default HeroHome;
