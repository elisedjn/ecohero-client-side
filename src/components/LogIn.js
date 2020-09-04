import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import "./styles/LogIn.css";


function LogIn(props) {
  return (
    <div id="login">
      <Form className="formIn" onSubmit={props.onLogIn}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" name="password" />
        </Form.Group>

        <div className="loginBtn">
          <Button className="loginBtnClick" variant="primary" type="submit">
          <img className="leaf1" src="/images/plant02.png" alt="o" />
           Log In
          <img className="leaf2" src="/images/plant.png" alt="o" />
          </Button>
        </div>

        <Form.Text className="small-text">
          Not a member yet? <Link to="/signup">Sign Up</Link>
        </Form.Text>
        
      </Form>
    </div>
    
  )
}

export default LogIn