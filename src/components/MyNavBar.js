import React from "react"; 
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from 'react-router-dom'

export default function MyNavBar(props) {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">EcoHero</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/challenges">Challenges</Link>
            <Link to="/ranks">Ranks</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            {props.loggedInUser ? (
              <button onClick={props.onLogOut}>Logout</button>
            ) : (
              <>
              <Link to="/signup">Sing Up</Link>
              <Link to="/login">Login</Link>
              </>
            )
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
