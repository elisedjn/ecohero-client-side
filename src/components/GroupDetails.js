import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import "./styles/GroupDetails.css";




class GroupDetails extends Component {
    state = {
      groupData: null,
      membersID: [],
    }

    componentDidMount() {
        let id = this.props.match.params.groupID;
        axios.get(`${API_URL}/groups/${id}`, {withCredentials: true})
        .then((res) => {
            let members = [] 
            res.data.members.map(e => members.push(e._id))
            this.setState({
            groupData: res.data,
            membersID: members,
          });
        });
      }


    handleJoin = () => {
      let newMember = this.props.loggedInUser;
      let cloneGroup = JSON.parse(JSON.stringify(this.state.groupData))
      let membersList = [...cloneGroup.members]
      membersList.push(newMember)
      cloneGroup.members = membersList
      let membersID = [] 
      cloneGroup.members.map(e => membersID.push(e._id))
      axios.patch(`${API_URL}/groups/${this.state.groupData._id}`, {membersList: membersList}, {withCredentials: true})
        .then((response) => {
          this.setState({
            groupData: cloneGroup,
            membersID: membersID
          })
        })
      
    }

    handleValidate = () => {
      let todaysDate = new Date(Date.now())
      todaysDate.setHours(0)
      if(todaysDate < new Date(this.state.groupData.date)){
        console.log("Too early to validate")
      } else {
        this.props.history.push(`/event-edit/${this.state.groupData._id}`)
      }
    }

    handleLeave = () => {
      let memberLeaving = this.props.loggedInUser;
      let cloneGroup = JSON.parse(JSON.stringify(this.state.groupData))
      let membersList = []
      cloneGroup.members.map(member => {
        if(member._id !== memberLeaving._id){
          membersList.push(member)
        }
      })
      cloneGroup.members = membersList
      let membersID = [] 
      cloneGroup.members.map(e => membersID.push(e._id))
      axios.patch(`${API_URL}/groups/${this.state.groupData._id}`, {membersList: membersList}, {withCredentials: true})
        .then((response) => {
          this.setState({
            groupData: cloneGroup,
            membersID: membersID
          })
        })
    }


    render() {

        if (!this.state.groupData || !this.props.loggedInUser) {
          return (
            <p>
              Loading... If you're not login yet, please{" "}
              <Link to="/login">click on this link</Link>
            </p>
          );
        }

        const {name, description, location, date, members, challenge} = this.state.groupData

        let fullDate = new Date(date);
        let daydate = '0' + fullDate.getDate();
        let month = '0' + (fullDate.getMonth() + 1);
        let year = fullDate.getFullYear()
        fullDate = daydate.slice(-2) + "/" + month.slice(-2) + "/" + year;

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
                <p>{fullDate}</p>

                <h5 className="subtitle">Participants</h5>
                {
                  members.map((member, i) => {
                    return (
                      <div key={"member" + i}>
                      <Link to={`/user/${member._id}`} > 
                      - {member.username} {i === 0? <span> (creator)</span> : ""} 
                      </Link>
                      </div>
                    )
                  })
                }
                
                {
                  this.state.membersID.includes(this.props.loggedInUser._id) ? 
                  (this.state.membersID[0] === this.props.loggedInUser._id ? 
                    <button onClick={this.handleValidate}>Valid the event</button> 
                    : <button onClick={this.handleLeave}>Leave the event</button> )
                  : (
                    <div className="edit-btn">
                    <button onClick={this.handleJoin}><img src="/images/valid.png" alt="Valid" /> Join the event</button>
                    </div>
                  )
                } 
              </div>
            </div>
        )
    }
}


export default GroupDetails
