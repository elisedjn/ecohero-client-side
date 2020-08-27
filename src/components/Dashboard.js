import React from "react";
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Link to="/hero-home"> Hero Home </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/goals-success"> Goals & Success </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/profile"> Profile </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Dashboard;
