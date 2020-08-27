import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

function SignUp(props) {
  return (
    <Form onSubmit={props.onSignUp}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" name="username"/>
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
      </Form.Group>

      <Form.Text className="text-muted">
        Already a member? <Link to="/login">Login</Link>
      </Form.Text>

      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  )
}

export default SignUp
