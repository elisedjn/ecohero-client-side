import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Switch, Route, withRouter } from "react-router-dom";
import { API_URL } from "./config";
import axios from "axios";

//Components
import MyNavBar from "./components/MyNavBar";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Ranks from "./components/Ranks";
import Leaderboard from "./components/Leaderboard";
import Home from "./components/Home";
import MyProfile from "./components/MyProfile";
import HeroHome from "./components/HeroHome";
import Dashboard from "./components/Dashboard";
import EditProfileForm from "./components/EditProfileForm";
import ChallengesList from "./components/ChallengesList";
import GoalsAndSuccess from "./components/GoalsAndSuccess";
import CreateChallForm from "./components/CreateChallForm";
import AchievementDetails from "./components/AchievementDetails";
import ChallengeDetails from "./components/ChallengeDetails";
import OtherProfile from "./components/OtherProfile";
import GoalsEdit from "./components/GoalsEdit";

class App extends React.Component {
  state = {
    loggedInUser: null,
  };

  componentDidMount() {
    if (!this.state.loggedInUser) {
      axios
        .get(`${API_URL}/auth/user`, { withCredentials: true })
        .then((res) => {
          axios
            .get(`${API_URL}/users/${res.data._id}`, { withCredentials: true })
            .then((user) => {
              this.setState({
                loggedInUser: user.data,
              });
            });
        });
    }
  }

  handleSignUp = (e) => {
    e.preventDefault();
    const { username, email, password } = e.currentTarget;
    axios
      .post(
        `${API_URL}/auth/signup`,
        {
          username: username.value,
          email: email.value,
          password: password.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        this.setState(
          {
            loggedInUser: res.data,
          },
          () => {
            this.props.history.push("/hero-home");
          }
        );
      });
  };

  handleLogIn = (e) => {
    e.preventDefault();
    const { email, password } = e.currentTarget;
    axios
      .post(
        `${API_URL}/auth/signin`,
        {
          email: email.value,
          password: password.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        this.setState(
          {
            loggedInUser: res.data,
          },
          () => {
            this.props.history.push("/hero-home");
          }
        );
      });
  };

  handleLogOut = () => {
    axios
      .post(`${API_URL}/auth/logout`, {}, { withCredentials: true })
      .then(() => {
        this.setState(
          {
            loggedInUser: null,
          },
          () => {
            this.props.history.push("/");
          }
        );
      });
  };

  handleEdit = (updatedUser) => {
    let cloneUser = {
      username: updatedUser.username,
      email: updatedUser.email,
      image: updatedUser.image,
      password: updatedUser.password,
    };
    axios
      .patch(
        `${API_URL}/users/${this.state.loggedInUser._id}/edit`,
        cloneUser,
        { withCredentials: true }
      )
      .then((res) => {
        console.log(updatedUser);
        delete cloneUser.password;
        cloneUser._id = res.data._id;
        cloneUser.points = res.data.points;
        cloneUser.rank = res.data.rank;
        cloneUser.passwordHash = res.data.passwordHash;
        this.setState(
          {
            loggedInUser: cloneUser,
          },
          () => {
            this.props.history.push("/profile");
          }
        );
      });
  };

  handleCreateChall = (e) => {
    console.log("in the handle fonction");
    e.preventDefault();
    const { title, description, points } = e.currentTarget;
    axios
      .post(
        `${API_URL}/challenges/create`,
        {
          title: title.value,
          description: description.value,
          points: points.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        this.props.history.push("/challenges");
      });
  };

  handleUpdateGoal = (updatedAchievement) => {
    const { image, _id, finishing_date } = updatedAchievement;
    let updatedSuccess = {
      completed: true,
      image: image,
      finishing_date: finishing_date,
    };
    axios
      .patch(`${API_URL}/achievements/${_id}`, updatedSuccess, {
        withCredentials: true,
      })
      .then((res) => {
        let pointsToAdd = res.data.challenge.points;
        let clonedUser = JSON.parse(JSON.stringify(this.state.loggedInUser));
        clonedUser.points += pointsToAdd;
        let newRank = this.handleRank(clonedUser.points);
        if (clonedUser.rank !== newRank) {
          clonedUser.rank = newRank;
        }
        console.log(clonedUser);
        axios
          .patch(
            `${API_URL}/users/${this.state.loggedInUser._id}/edit`,
            clonedUser,
            { withCredentials: true }
          )
          .then((response) => {
            this.setState(
              {
                loggedInUser: clonedUser,
              },
              this.props.history.push("/hero-home")
            );
          });
      });
  };

  handleRank = (nbOfPoints) => {
    if (nbOfPoints >= 100000) {
      return "Super Hero";
    } else if (nbOfPoints > 50000) {
      return "Big Hero";
    } else if (nbOfPoints > 25000) {
      return "Smart Hero";
    } else if (nbOfPoints > 10000) {
      return "Chill Hero";
    } else {
      return "New Hero";
    }
  };

  render() {
    return (
      <div id="app">
        <MyNavBar onLogOut={this.handleLogOut} loggedInUser={this.state.loggedInUser} />
        {this.state.loggedInUser ? <Dashboard /> : ""}

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" render={(routeProps) => {
              return <SignUp onSignUp={this.handleSignUp} {...routeProps} />;
            }}/>
          <Route path="/login" render={(routeProps) => {
              return <LogIn onLogIn={this.handleLogIn} {...routeProps} />;
            }}/>
          <Route path="/ranks" component={Ranks} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route exact path="/profile" render={(routeProps) => {
              return <MyProfile loggedInUser={this.state.loggedInUser} {...routeProps}/>
            }}/>
          <Route path="/profile/edit" render={(routeProps) => {
              return <EditProfileForm loggedInUser={this.state.loggedInUser} onEdit={this.handleEdit} {...routeProps} />
            }}/>
          <Route path="/hero-home" render={(routeProps) => {
              return <HeroHome loggedInUser={this.state.loggedInUser} {...routeProps}/>
            }} />
          <Route path="/goals-success" render={(routeProps) => {
              return <GoalsAndSuccess loggedInUser={this.state.loggedInUser} {...routeProps}/>
            }}/>
          <Route exact path="/challenges" render={(routeProps) => {
              return <ChallengesList loggedInUser={this.state.loggedInUser} {...routeProps} />
            }}/>
          <Route path="/challenges/create" render={(routeProps) => {
              return <CreateChallForm loggedInUser={this.state.loggedInUser} onSubmit={this.handleCreateChall} {...routeProps}/>
            }}/>
          <Route path="/achievement/:achievementID" render={(routeProps) => {
              return <AchievementDetails loggedInUser={this.state.loggedInUser} {...routeProps} />;
            }}/>
          <Route path="/challenge/:challengeID" render={(routeProps) => {
              return <ChallengeDetails loggedInUser={this.state.loggedInUser} {...routeProps} />;
            }}/>
          <Route path="/user/:userID" render={(routeProps) => {
              return <OtherProfile {...routeProps} />;
            }}/>
          <Route path="/goals-edit/:achievementID" render={(routeProps) => {
              return <GoalsEdit onUpdate={this.handleUpdateGoal} {...routeProps} />
            }}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
