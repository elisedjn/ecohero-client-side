import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {API_URL} from '../config'
import "./styles/Leaderboard.css"



class Leaderboard extends Component {

    state={
        users:[]
    }

    componentDidMount(){
        axios.get(`${API_URL}/users/leaderboard`)
            .then((res) => {
                this.setState({
                    users: res.data
                })
            })
    }


    render() {

        if (!this.state.users){
            return <p>Loading...</p>
        }

        return (
            <div className="leaderboard">
                <h3 className="HallTitle">Hall of Heroes</h3>
                {
                    this.state.users.map((user) => {
                        const {username, points, _id} = user
                        return <Link to={`/user/${_id}`}><div className="container">
                                                            <ol className="list">
                                                            <li className="listItems">{username} {points} points</li>
                                                            </ol>
                                                         </div></Link>
                    })
                }
            </div>
        )
    }
}



export default Leaderboard