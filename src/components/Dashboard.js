import React from "react";
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import './styles/Dashboard.css';

function Dashboard() {
  return (
    <div>
      <Nav id="dashboard" activeKey="/home">
        <Nav.Item>
          <Link to="/hero-home"> <img src="/home.png"/> Hero Home </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/goals-success"> <img src="/goal.png"/>  Goals & Success </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/profile"> <img src="/user.png"/> Profile </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Dashboard;
