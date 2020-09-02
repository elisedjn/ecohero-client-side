import React from "react";
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import './styles/Dashboard.css';

function Dashboard() {
  return (
    <div>
      <Nav id="dashboard" activeKey="/home">
        <Nav.Item>
          <Link to="/hero-home"> <img src="/images/home.png" alt='hero-home'/> Hero Home </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/goals-success"> <img src="/images/goal.png" alt='goals & success'/>  Goals & Success </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/groups"> <img src="/images/collaboration.png" alt='group'/> Groups </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/profile"> <img src="/images/user.png" alt='profile'/> Profile </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Dashboard;
