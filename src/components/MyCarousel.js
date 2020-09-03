import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import Carousel from "react-bootstrap/Carousel";
import {Link} from 'react-router-dom';
import "./styles/MyCarousel.css";

export default class MyCarousel extends Component {
  state = {
    achievements: [],
    events: []
  };

  componentDidMount() {
    axios
      .get(`${API_URL}/achievements/allcompleted`)
      .then((achievements) => {
        axios.get(`${API_URL}/groups`)
        .then((events) => {
          let finishedEvents = events.data.filter(e => e.finished)
          this.setState({
            achievements: achievements.data,
            events: finishedEvents
          });
        })
      })
      .catch((err) => console.log(err));
  }
  render() {
    if (!this.state.achievements) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <Carousel id="myCarousel">
          {this.state.achievements.map((achievement, i) => {
            return (
              <Carousel.Item key={"publicSuccess" + i}>
              <Link to={`/achievement/${achievement._id}`}>
                <img
                  className="d-block w-100"
                  src="/images/carouselbg.png"
                  alt="background"
                />
                <Carousel.Caption >
                  <div className="carousel-image">
                    <table className="img-container">
                    <tr>
                      <td><img
                        className="d-block"
                        src={achievement.image}
                        alt={achievement.challenge.title}
                      /></td>
                    </tr>
                    </table>
                  </div>
                  <div className="carousel-text">
                    <h5>{achievement.challenge.title}</h5>
                    <div className="user-infos">
                      <img
                        src={achievement.user.image}
                        alt={achievement.user.username}
                      />
                      <div>
                      <p className="username">{achievement.user.username}</p>
                      <p className="points-info">{achievement.user.rank} - {achievement.user.points} pts</p>
                      
                      </div>
                    </div>
                  </div>
                </Carousel.Caption>
                </Link>
              </Carousel.Item>
            );
          })}
          {this.state.events.map((event, i) => {
            return (
              <Carousel.Item key={"publicEvent" + i}>
              <Link to={`/groups/${event._id}`}>
                <img
                  className="d-block w-100"
                  src="/images/carouselbg.png"
                  alt="background"
                />
                <Carousel.Caption >
                  <div className="carousel-image">
                    <table className="img-container">
                    <tr>
                      <td><img
                        className="d-block"
                        src={event.image}
                        alt={event.challenge.title}
                      /></td>
                    </tr>
                    </table>
                  </div>
                  <div className="carousel-text">
                    <h5>Group Action</h5>
                    <h5>{event.name}</h5>
                    <div className="user-infos">
                      <div>
                      <p className="username">{event.location}</p>
                      <p className="points-info">{event.date}</p>
                      </div>
                    </div>
                  </div>
                </Carousel.Caption>
                </Link>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    );
  }
}
