import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import {Switch, Route, Link, withRouter} from 'react-router-dom';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Ranks from "./components/Ranks"
import Leaderboard from "./components/Leaderboard"
import {API_URL} from './config'
import axios from 'axios'


class App extends React.Component {
  state = {
    user: [],
    loggedInUser: null
  }

  handleSignUp = (e) => {
    e.preventDefault();
    const {username, email, password} = e.currentTarget;
    axios.post(`${API_URL}/auth/signup`, {
      username: username.value,
      email: email.value,
      password: password.value
    }, {withCredentials: true})
      .then((res) => {
        console.log(res.data)
        this.setState({
          loggedInUser: res.data
        }, () => {
          this.props.history.push('/')
        })
      })

  }
  
  handleLogIn = (e) => {
    e.preventDefault();
    const {email, password} = e.currentTarget;
    axios.post(`${API_URL}/auth/signin`, { 
      email: email.value, 
      password: password.value}, {withCredentials: true})
      .then((res) => {
        this.setState({
          loggedInUser: res.data
        }, () => {
          this.props.history.push('/')
        })
      })
  }

  handleLogOut = (e) => {
    axios.post(`${API_URL}/auth/logout`, {}, {withCredentials: true})
      .then(() => {
        this.setState({
          loggedInUser: null
        }, () => {
          console.log("Logout")
        })
      })
  }

  render(){
    return (
      <div>
        <Link to="/signup">Sing Up</Link>
        <br/>
        <Link to="/login">Login</Link>
        <br/>
        <Link to="/ranks">Ranks</Link>
        <br/>
        <Link to="/leaderboard">Leaderboard</Link>
        <br/>
        <button onClick={this.handleLogOut}>Logout</button>
        <Switch>
          <Route path="/signup" render={(routeProps) => {
            return <SignUp onSignUp={this.handleSignUp} {...routeProps} />
          }}/>
          <Route path="/login" render={(routeProps) => {
            return <LogIn onLogIn={this.handleLogIn} {...routeProps}  />
          }}/>
          <Route path="/ranks" render={() => {
            return <Ranks/> }}/>
          <Route path="/users/leaderboard" render={(routeProps) => {
            return <Leaderboard user={this.state.user} {...routeProps} /> }}/>
        </Switch>
      </div>
    );
  }
  
}

export default withRouter(App);
