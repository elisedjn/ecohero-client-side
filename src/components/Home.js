import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import About from "./About"
import MyCarousel from './MyCarousel'





class Home extends Component {

    render() {
        return (
            <div>
              <h4>Welcome to</h4>
              <h3>EcoHero</h3>

              <div>
                  <p>Join the community, set your eco-friendly goals, share your achievements and become a Super EcoHero!</p>
                  <Link to="/signup"><button>Get Started</button></Link>
              </div>

              <div>
                  <h4>Get Inspired</h4>
                  <MyCarousel /> 
              </div>

              <About/>  
            </div>
        )
    }
}


export default Home