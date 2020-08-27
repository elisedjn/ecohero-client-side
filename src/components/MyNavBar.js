import React from "react"; 
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function MyNavBar(props) {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">EcoHero</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/ranks">Ranks</Nav.Link>
            <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
            {props.loggedInUser ? (
              <button onClick={props.onLogOut}>Logout</button>
            ) : (
              <>
              <Nav.Link href="/signup">Sing Up</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              </>
            )
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
