import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import "./styles/SignUp.css";

function SignUp(props) {
  return (
    <div id="signup">
      <Form className="formUp" onSubmit={props.onSignUp}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" name="username"/>
          <Form.Text className="text-muted">
            Make it as unique as you are.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" />
          <Form.Text className="text-muted">
            Password needs to have at least 8 characters, a number and an Uppercase alphabet.
          </Form.Text>
        </Form.Group>

        <Form.Text className="small-text">
          Already a member? <Link to="/login">Login</Link>
        </Form.Text>

        <div className="signUpBtn">
          <Button className="signUpBtnClick" variant="primary" type="submit">
          <img className="leaf1" src="/images/plant02.png" alt="o" />
            Sign Up
          <img className="leaf2" src="/images/plant.png" alt="o" />
          </Button>
        </div>
      </Form>
    </div>
    
  )
}

export default SignUp
