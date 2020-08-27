import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {API_URL} from '../config'



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
            <div>
                <h3>Hall of Heroes</h3>
                {
                    this.state.users.map((user) => {
                        const {username, points, _id} = user
                        return <Link to={`/users/${_id}`}><p>{username} {points} points</p></Link>
                    })
                }
            </div>
        )
    }
}



export default Leaderboard