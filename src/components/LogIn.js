import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import "./styles/LogIn.css";


function LogIn(props) {
  return (
    <div className="login">
      <Form className="form" onSubmit={props.onLogIn}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" name="password" />
        </Form.Group>

        <Form.Text className="text-muted">
          Not a member yet? <Link to="/signup">Sign Up</Link>
        </Form.Text>

        <div className="loginBtn">
          <Button className="loginBtnClick" variant="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
    
  )
}

export default LogIn