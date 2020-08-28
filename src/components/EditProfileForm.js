import React, { Component } from "react";
import axios from "axios";
import {API_URL} from '../config';

class EditProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.loggedInUser,
    };
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

    axios.post(`${API_URL}/upload`, uploadData, { withCredentials: true })
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
      return <p>Loading ....</p>;
    }
    const { username, image, password, email } = this.state.user;
    return (
      <div>
        <img src={image} alt="Avatar" />
        <label htmlFor="image">Change your profile picture:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/png, image/jpeg"
          onChange={this.handleImageChange}
        ></input>
        <input
          onChange={this.handleUsernameChange}
          name="username"
          type="text"
          placeholder="Enter username"
          value={username}
        ></input>
        <input
          onChange={this.handleEmailChange}
          name="email"
          type="email"
          value={email}
          placeholder="Enter email"
        ></input>
        <input
          onChange={this.handlePasswordChange}
          name="password"
          type="password"
          value={password}
          placeholder="Enter password"
        ></input>
        <button
          onClick={() => this.props.onEdit(this.state.user)}
          type="submit"
        >
          Edit
        </button>
      </div>
    );
  }
}

export default EditProfileForm;
