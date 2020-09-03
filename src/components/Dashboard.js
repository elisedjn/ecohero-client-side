import React, { Component } from "react";
import Nav from 'react-bootstrap/Nav';
import {Link, withRouter} from 'react-router-dom';
import './styles/Dashboard.css';

class Dashboard extends Component {
  render() {
  return (
    <div>
      <Nav id="dashboard" activeKey="/home">
        <Nav.Item>
          <Link to="/hero-home"> <img src={this.props.history.location.pathname === "/hero-home" ? "/images/homefull.png" : "/images/home.png"} alt='hero-home'/> Hero Home </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/goals-success"> <img src={this.props.history.location.pathname === "/goals-success" ? "/images/goalfull.png" : "/images/goal.png"} alt='goals & success'/>  Goals & Success </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/groups"> <img src={this.props.history.location.pathname === "/groups" ? "/images/collaborationfull.png" : "/images/collaboration.png"}alt='group'/> Events </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/profile"> <img src={this.props.history.location.pathname === "/profile" ? "/images/userfull.png" : "/images/user.png"} alt='profile'/> Profile </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
  }
}

export default withRouter(Dashboard);
