import React, { Component } from "react";
import { Link } from "react-router-dom";
import About from "./About";
import MyCarousel from "./MyCarousel";
import "./styles/Home.css";

class Home extends Component {
  render() {
    return (
      <div id="home">
        <div id="hometitle">
          <h4>Welcome to</h4>
          <h3>EcoHero</h3>
        </div>
        <div>
          <p className="punchline">
            Join the community, set your eco-friendly goals, share your success
            and <strong>become a Super EcoHero</strong>!
          </p>
          <Link to="/signup">
            <button className="bouncy"><img src="/images/plant02.png" alt="o" /> Get Started ! <img src="/images/plant.png" alt="o" /></button>
          </Link>
        </div>

        <div className="carousel-container">
          <div className="carousel-title">
            <h4>Get Inspired</h4>
            <h5>... Our EcoHeroes success</h5>
          </div>

          <MyCarousel />
        </div>

        <About />
      </div>
    );
  }
}

export default Home;
