import React from "react"; 
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from 'react-router-dom';

import './styles/MyNavBar.css';

export default function MyNavBar(props) {
  return (
    <div>
      <Navbar collapseOnSelect id="myNavBar" fixed="top" variant="light" expand="lg">
        <div id='fakeitem'></div>
        <Navbar.Brand href="/"><img src="/images/ecohero_logo.png" alt="EH" /> EcoHero</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Navbar.Toggle><Link to="/challenges" data-toggle="collapse" >Challenges</Link><Navbar.Toggle>
            <Navbar.Toggle><Link to="/ranks" data-toggle="collapse">Ranks</Link></Navbar.Toggle>
            <Navbar.Toggle><Link to="/leaderboard" data-toggle="collapse">Hall of Heroes</Link></Navbar.Toggle>
            {props.loggedInUser ? (
              <Navbar.Toggle className="auth-link"><button onClick={props.onLogOut} data-toggle="collapse">Logout</button></Navbar.Toggle>
            ) : (
              <>
              <Navbar.Toggle className="auth-link"><Link to="/signup" data-toggle="collapse">Sing Up</Link></Navbar.Toggle>
              <Navbar.Toggle className="auth-link"><Link to="/login" data-toggle="collapse">Login</Link></Navbar.Toggle>
              </>
            )
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
