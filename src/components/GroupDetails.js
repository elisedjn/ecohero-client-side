import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import "./styles/GroupDetails.css";




class GroupDetails extends Component {


    componentDidMount() {
        let id = this.props.match.params.groupID;
        axios.get(`${API_URL}/groups/${id}`, {withCredentials: true}).then((res) => {
          this.setState({
            achievement: res.data,
          });
        });
      }


    render() {

        if (!this.state.group) {
            return <p>Loading...</p>;
        }

        const {description, location, date, members} = this.state.group

        return (
            <div id="groupDetails">
              <div className="white-card">
                <h5 className="subtitle">Description</h5>
                {/* <p>{group.description}</p> */}

                <h5 className="subtitle">Location</h5>
                {/* <p>{group.location}</p> */}

                <h5 className="subtitle">Date</h5>
                {/* <p>{group.date}</p> */}

                <h5 className="subtitle">Members</h5>
                {/* <p>{group.members}</p> */}

                <div className="edit-btn">
                    <Link to={`/groups`}>
                        <img src="/images/valid.png" alt="Valid" /> Join the group
                    </Link>
                </div>
              </div>
            </div>
        )
    }
}


export default GroupDetails
