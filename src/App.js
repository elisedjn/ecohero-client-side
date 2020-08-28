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
import HeroHome from "./components/HeroHome"
import Dashboard from './components/Dashboard';
import EditProfileForm from './components/EditProfileForm';
import GoalsAndSuccess from "./components/GoalsAndSuccess"
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

  handleEdit = (updatedUser) => {
    let cloneUser = {
      username: updatedUser.username,
      email: updatedUser.email, 
      image: updatedUser.image,
      password: updatedUser.password
    }
    axios.patch(`${API_URL}/users/${this.state.loggedInUser._id}/edit`, cloneUser, {withCredentials: true})
    .then((res) => {
        delete cloneUser.password
        cloneUser._id = res.data._id
        cloneUser.points = res.data.points
        cloneUser.rank = res.data.rank
        cloneUser.passwordHash = res.data.passwordHash
        this.setState({
          loggedInUser: cloneUser
        }, () => {
          console.log(this.state.loggedInUser)
          this.props.history.push('/')
        })
    })
  }

  // handleRank = () => {
  //   if (this.state.loggedInUser.points > 10000) {
  //   this.state.loggedInUser.rank = "Chill Hero"
  //   } else if (this.state.loggedInUser.points > 25000) {
  //   this.state.loggedInUser.rank = "Smart Hero"
  //   }else if (this.state.loggedInUser.points > 50000) {
  //   this.state.loggedInUser.rank = "Big Hero"
  //   }else if (this.state.loggedInUser.points > 100000) {
  //   this.state.loggedInUser.rank = "Super Hero"
  //   } else {
  //   {this.state.loggedInUser.rank} = "New Hero"
  //   }
  // }

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
          <Route exact path="/profile" render={(routeProps) => {
            return <Profile loggedInUser = {this.state.loggedInUser} {...routeProps}  />
          }}/>
          <Route path='/profile/edit' render={(routeProps) => {
            return <EditProfileForm loggedInUser = {this.state.loggedInUser} onEdit={this.handleEdit} {...routeProps}  />
          }} />
          <Route path="/hero-home" render={(routeProps) => {
            return <HeroHome loggedInUser = {this.state.loggedInUser} {...routeProps}  />
          }}/>
          <Route path="/goals-success" render={(routeProps) => {
            return <GoalsAndSuccess loggedInUser = {this.state.loggedInUser} {...routeProps}  />
          }}/>
        </Switch>
        {
          this.state.loggedInUser? <Dashboard /> : ''
        }
        
      </div>
    );
  }
}

export default withRouter(App);
