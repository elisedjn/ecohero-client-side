import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import About from "./About"
import MyCarousel from './MyCarousel'
import "./styles/Home.css"



class Home extends Component {

    render() {
        return (
            <div className="bgImg">
                <div className="welcome">
                <h3>Welcome to</h3>
                <h2>EcoHero</h2>
                </div>
        

              <div className="text">
                  <p>Join the community, set your eco-friendly goals, share your achievements and become a Super EcoHero!</p>
                  <Link to="/signup"><button className="startBtn">Get Started</button></Link>
              </div>

              <div className="carousel">
                  <h5>Get Inspired</h5>
                  <MyCarousel /> 
              </div>

              <About/>  
            </div>
        )
    }
}


export default Home