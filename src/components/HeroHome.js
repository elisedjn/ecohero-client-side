import React, { Component } from 'react'
import MyCarousel from "./MyCarousel"
import {Link} from 'react-router-dom'
import axios from "axios"
import {API_URL} from '../config'





class HeroHome extends Component {

    state = {
        userAchievements: [] 
    }

    componentDidMount() {
        axios.get(`${API_URL}/achievements/user/${this.props.loggedInUser._id}`, {withCredentials: true})
        .then((res) => {
            this.setState({
                userAchievements: res.data
            })
            
        })
    }


    render() {
        return (
            <div>
             <h3>Hero Home</h3>
                <div>
                    {/* <img src={} alt="default pic"/> */}
                    <p>{this.props.loggedInUser.username}</p>
                    <p>{this.props.loggedInUser.rank} - {this.props.loggedInUser.points} points</p>
                    <Link to={`/users/${this.props.loggedInUser._id}/edit`}>Edit</Link>
                    <h5>Your EcoHero tasks</h5>
                    <div>
                        {
                            this.state.userAchievements.map((achievement) => {
                                if (!achievement.completed) {
                                    return <p>{achievement.challenge.title}</p>}
                            })
                        }
                    </div>

                </div>




            
                <div>
                  <h4>Get Inspired</h4>
                  <MyCarousel /> 
                </div>
    
            </div>
        )
    }
}

export default HeroHome

