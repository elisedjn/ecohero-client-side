import React from "react"; 
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from 'react-router-dom';

import './styles/MyNavBar.css';

export default function MyNavBar(props) {
  return (
    <div>
      <Navbar id="myNavBar" fixed="top" variant="light" expand="lg">
        <div id='fakeitem'></div>
        <Navbar.Brand href="/"><img src="/images/ecohero_logo.png" alt="EH" /> EcoHero</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" data-toggle="collapse">
            <Link to="/challenges" data-toggle="collapse" >Challenges</Link>
            <Link to="/ranks" data-toggle="collapse">Ranks</Link>
            <Link to="/leaderboard" data-toggle="collapse">Hall of Heroes</Link>
            {props.loggedInUser ? (
              <button className="auth-link" onClick={props.onLogOut} data-toggle="collapse">Logout</button>
            ) : (
              <>
              <Link className="auth-link" to="/signup" data-toggle="collapse">Sing Up</Link>
              <Link className="auth-link" to="/login" data-toggle="collapse">Login</Link>
              </>
            )
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
