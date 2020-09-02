import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import "./styles/GroupDetails.css";




class GroupDetails extends Component {
    state = {
      groupData: null,
      membersID: []
    }

    componentDidMount() {
        let id = this.props.match.params.groupID;
        axios.get(`${API_URL}/groups/${id}`, {withCredentials: true})
        .then((res) => {
          let members = [] 
          res.data.members.map(e => members.push(e._id))
          this.setState({
            groupData: res.data,
            membersID: members
          });
        });
      }


    handleJoin = (member) => {
      console.log(member)
      this.setState({
        membersID: member
      })
    }


    render() {

        if (!this.state.groupData) {
            return <p>Loading...</p>;
        }

        const {name, description, location, date, members, challenge} = this.state.groupData

        return (
            <div id="groupDetails">
              <h3 className="title">{name}</h3>
              <div className="white-card">
                <h5 className="subtitle">Description</h5>
                <p>{description}</p>

                <h5 className="subtitle">What is it about?</h5>
                <p>{challenge.description}</p>

                <h5 className="subtitle">Why is it useful?</h5>
                <p>{challenge.fact}</p>

                <h5 className="subtitle">How many points will I get?</h5>
                <p>Each participant will earn {challenge.points} points</p>

                <h5 className="subtitle">Location</h5>
                <p>{location}</p>

                <h5 className="subtitle">Date</h5>
                <p>{date}</p>

                <h5 className="subtitle">Participants</h5>
                {
                  members.map((member, i) => {
                    return (
                      <div key={"member" + i}> {member.username} </div>
                    )
                  })
                }
                
                {
                  this.state.membersID.includes(this.props.loggedInUser._id) ? "" : <div className="edit-btn">
                  <button onClick={this.handleJoin}><img src="/images/valid.png" alt="Valid" /> Join the event</button></div>
                } 
              </div>
            </div>
        )
    }
}


export default GroupDetails
