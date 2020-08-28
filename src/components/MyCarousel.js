import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import Carousel from 'react-bootstrap/Carousel';

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
        <Carousel>
          {this.state.achievements.map((achievement, i) => {
            return (
              <Carousel.Item key={'publicSuccess' + i}>
                <img
                  className="d-block w-100"
                  src= 'https://media.istockphoto.com/photos/defocused-green-background-picture-id925561778?k=6&m=925561778&s=612x612&w=0&h=0ng60JNYKIBUr2zrLbVXsfO4t35nrxoQ2mMRNtx9A_g='
                 alt="background"/>
                <Carousel.Caption>
                  <h3>{achievement.challenge.title}</h3>
                  <img
                  className="d-block w-50"
                  src= {achievement.image}
                  alt= {achievement.challenge.title}
                />
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
