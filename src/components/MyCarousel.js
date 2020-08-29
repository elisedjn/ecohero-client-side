import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import Carousel from 'react-bootstrap/Carousel';
import "./styles/MyCarousel.css";

export default class MyCarousel extends Component {
  state = {
    achievements: [],
  };

  componentDidMount() {
    axios.get(`${API_URL}/achievements/allcompleted`)
    .then((res) => {
      this.setState({
        achievements: res.data,
      });
    })
    .catch((err) => console.log(err))
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
              <Carousel.Item key={'publicSuccess' + i}>
                <img
                  className="d-block w-100"
                  src= '/carouselbg.png'
                 alt="background"/>
                <Carousel.Caption>
                  <h4>{achievement.challenge.title}</h4>
                  {
                    achievement.image ? (<img
                  className="d-block w-50"
                  src= {achievement.image}
                  alt= {achievement.challenge.title}
                />) : ""
                  }
                  
                  <div style={{display:'flex'}}> 
                    <img src={achievement.user.image} alt={achievement.user.username} style={{width: "50px", height:"50px"}} />
                    <h5>{achievement.user.username}</h5>
                    <p>{achievement.user.points} pts</p>
                    <p>{achievement.user.rank}</p>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    );
  }
}
