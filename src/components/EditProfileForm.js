import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import "./styles/EditProfileForm.css";

class EditProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      user: null,
    };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/auth/user`, { withCredentials: true })
      .then((result) => {
        axios
          .get(`${API_URL}/users/${result.data._id}`, { withCredentials: true })
          .then((res) => {
            this.setState({
              loggedInUser: result.data,
              user: res.data,
            });
          });
      });
  }

  handleUsernameChange = (e) => {
    let updatedUser = JSON.parse(JSON.stringify(this.state.user));
    updatedUser.username = e.currentTarget.value;
    this.setState({
      user: updatedUser,
    });
  };

  handleEmailChange = (e) => {
    let updatedUser = JSON.parse(JSON.stringify(this.state.user));
    updatedUser.email = e.currentTarget.value;
    this.setState({
      user: updatedUser,
    });
  };

  handlePasswordChange = (e) => {
    let updatedUser = JSON.parse(JSON.stringify(this.state.user));
    updatedUser.password = e.currentTarget.value;
    this.setState({
      user: updatedUser,
    });
  };

  handleImageChange = (e) => {
    let uploadData = new FormData();
    uploadData.append("imageUrl", e.currentTarget.files[0]);

    axios
      .post(`${API_URL}/upload`, uploadData, { withCredentials: true })
      .then((response) => {
        let updatedUser = JSON.parse(JSON.stringify(this.state.user));
        updatedUser.image = response.data.image;
        this.setState({
          user: updatedUser,
        });
      });
  };

  render() {
    if (!this.state.user) {
      return (
        <p>
          Loading... If you're not login yet, please{" "}
          <Link to="/login">click on this link</Link>
        </p>
      );
    }
    const { username, image, password, email } = this.state.user;
    return (
      <div id="editProfile">
        <h3 className="title">Edit your profile</h3>
        <div class="white-card">
            <div className="image-edit">
            <img src={image} alt="Avatar" />
            <div className="input-container">
            <label htmlFor="image">Modify your profile picture:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg"
              onChange={this.handleImageChange}
            />
            </div>
          </div>

          <div className="input-container">
            <label>Update your username</label>
            <input
              onChange={this.handleUsernameChange}
              name="username"
              type="text"
              placeholder="Enter username"
              value={username}
            ></input>
          </div>

          <div className="input-container">
            <label>Change your email</label>
            <input
              onChange={this.handleEmailChange}
              name="email"
              type="email"
              value={email}
              placeholder="Enter email"
            ></input>
          </div>

          <div className="input-container">
            <label>Set a new password</label>
            <input
              onChange={this.handlePasswordChange}
              name="password"
              type="password"
              value={password}
              placeholder="Enter password"
            ></input>
          </div>

          <button
            className="submit-btn"
            onClick={() => this.props.onEdit(this.state.user)}
            type="submit"
          >
            <img src="/plant02.png" /> Edit
          </button>
        </div>
      </div>
    );
  }
}

export default EditProfileForm;
