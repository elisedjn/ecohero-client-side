import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import {Switch, Route, withRouter} from 'react-router-dom';
//Components
import MyNavBar from './components/MyNavBar'
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Ranks from "./components/Ranks"
import Leaderboard from "./components/Leaderboard"
import Home from "./components/Home"
import Profile from "./components/Profile"
import {API_URL} from './config'
import axios from 'axios'

class App extends React.Component {
  state = {
    loggedInUser: null
  }

  componentDidMount(){
    if(!this.state.loggedInUser){
      axios.get(`${API_URL}/auth/user`, {withCredentials: true})
      .then((res) => {
        this.setState({
          loggedInUser: res.data
        })
      })
    }
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
          this.props.history.push('/')
        })
      })
  }

  handleEdit = (e) => {
    axios.post(`${API_URL}/auth/logout`, {}, {withCredentials: true})
      .then(() => {
        this.setState({
          loggedInUser: null
        }, () => {
        })
      })
  }

  render(){
    return (
      <div>
        <MyNavBar onLogOut = {this.handleLogOut} loggedInUser = {this.state.loggedInUser}/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/signup" render={(routeProps) => {
            return <SignUp onSignUp={this.handleSignUp} {...routeProps} />
          }}/>
          <Route path="/login" render={(routeProps) => {
            return <LogIn onLogIn={this.handleLogIn} {...routeProps}  />
          }}/>
          <Route path="/ranks" component={Ranks}/>
          <Route path="/leaderboard" component={Leaderboard}/>
          <Route path="/profile" render={(routeProps) => {
            return <Profile loggedInUser = {this.state.loggedInUser} {...routeProps}  />
          }}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
