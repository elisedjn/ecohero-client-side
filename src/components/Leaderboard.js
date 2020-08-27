import React, { Component } from 'react'
import {Link} from 'react-router-dom'



class Leaderboard extends Component {

    state={
        user:[]
    }


    render() {

        if (!this.state.user){
            return <p>Loading...</p>
        }

        const {username, points} = this.state.user

        return (
            <div>
                <h3>Hall of Heroes</h3>
                {
                    this.props.map((user) => {
                        return <Link to={`/users/${user._id}`}><p>{username}</p><p>{points}</p></Link>
                    })
                }
            </div>
        )
    }
}



export default Leaderboard