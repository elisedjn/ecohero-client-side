import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Switch, Route, withRouter } from "react-router-dom";
import { API_URL } from "./config";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
import Groups from "./components/Groups"
import GroupDetails from "./components/GroupDetails"
import GroupCreate from "./components/GroupCreate"
import NotFoundPage from "./components/NotFoundPage"
import GroupEdit from "./components/GroupEdit";
import Loading from "./components/Loading"


class App extends React.Component {
  state = {
    loggedInUser: null,
    showGeneralModal: false,
    modalMessage : "",
    modalHeader: "",
    modalButtonType: "",
    modalButtonStyle: {}
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
      })
      .catch((err) => {
        const {errorMessage} = err.response.data
        this.setState({
          showGeneralModal: true,
          modalMessage : errorMessage,
          modalHeader: "Oops!",
          modalButtonType: "info"
        })
      })
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
      })
      .catch((err) => {
        const {errorMessage} = err.response.data
        this.setState({
          showGeneralModal: true,
          modalMessage : errorMessage,
          modalHeader: "Oops!",
          modalButtonType: "info"
        })
      })
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
    if (updatedUser.username === ""){
      this.setState({
        showGeneralModal: true,
        modalMessage : "Username can't be blank",
        modalHeader: "Oops!",
        modalButtonType: "info"
      })
    } else if (updatedUser.email === ""){
      this.setState({
        showGeneralModal: true,
        modalMessage : "Email can't be blank",
        modalHeader: "Oops!",
        modalButtonType: "info"
      })
    } else if (updatedUser.password === ""){
      this.setState({
        showGeneralModal: true,
        modalMessage : "Password can't be blank",
        modalHeader: "Oops!",
        modalButtonType: "info"
      })
    } else {
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
      })
      .catch((err) => {
        console.log(err.response)
        const {errorMessage} = err.response.data
        let message
        if(errorMessage.codeName === "DuplicateKey"){
          if(Object.keys(errorMessage.keyPattern).includes("username")){
            message = "This username already exists. Please select a new one."
          } else if(Object.keys(errorMessage.keyPattern).includes("email")){
            message = "This email is already in use. Please select a new one."
          }
        } else {
          message = errorMessage
        }
        this.setState({
          showGeneralModal: true,
          modalMessage : message,
          modalHeader: "Oops!",
          modalButtonType: "info"
        })
      })
    }
  };

  handleCreateChall = (e) => {
    e.preventDefault();
    const { title, description, points, fact } = e.currentTarget;
    console.log(points)
    if(title.value === ""){
      this.setState({
        showGeneralModal: true,
        modalMessage : "Please enter a title for your challenge",
        modalHeader: "Oops!",
        modalButtonType: "info"
      })
    } else if (points.value === "" || points.value < 100 || points.value > 10000){
      console.log("in the points if")
      this.setState({
        showGeneralModal: true,
        modalMessage : "The points should be between 100 and 10.000",
        modalHeader: "Oops!",
        modalButtonType: "info"
      })
    } else {
    axios
      .post(
        `${API_URL}/challenges/create`,
        {
          title: title.value,
          description: description.value,
          points: points.value,
          fact: fact.value
        },
        { withCredentials: true }
      )
      .then((res) => {
        this.props.history.push("/challenges");
      })
      .catch((err) => {
        const {errors} = err.response.data.errorMessage
        const problem = Object.keys(errors)[0]
        this.setState({
          showGeneralModal: true,
          modalMessage : `Please add some ${problem} to your challenge`,
          modalHeader: "Oops!",
          modalButtonType: "info"
        })
      })
    }
  };

  handleUpdateGoal = (updatedAchievement) => {
    const { image, _id, finishing_date } = updatedAchievement;
    if (new Date(finishing_date) > new Date(Date.now()))
    {
      this.setState({
        showGeneralModal: true,
        modalMessage : 'The achievement date should not be in the future',
        modalHeader: "Oops!",
        modalButtonType: "success"
      })
    } else {
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
        let message = ""
        let congratulations = false;
        clonedUser.points += pointsToAdd;
        let newRank = this.handleRank(clonedUser.points);
        if (newRank === "Big Hero") clonedUser.points += 10000;
        if (clonedUser.rank !== newRank) {
          clonedUser.rank = newRank;
          congratulations = true
          let bonus = this.handleBonus(newRank)
          message = `You're now a ${newRank}! 
          ${bonus}`
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
                showGeneralModal: congratulations ? true : false,
                modalMessage : message,
                modalHeader: "Congratulations!",
                modalButtonType: "success"
              },
              this.props.history.push("/hero-home")
            );
          });
      });
    }
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

  handleBonus = (rank) => {
    switch (rank) {
      case "Chill Hero":
        return "You can now CREATE EVENTS!";
      case "Smart Hero":
        return "You can now CREATE CHALLENGES!";
      case "Big Hero":
        return "You win 10.000 points bonus!";
      case "Super Hero":
        return "You deserve nice surprises! Check your emails, we will contact you soon ;)"
    }
  };

  handleUpdateEvent = (event) => {
    const { image, _id, members } = event;
    let updatedEvent = {
      finished: true,
      image: image,
    };
    axios.patch(`${API_URL}/groups/valid/${_id}`, updatedEvent, {
        withCredentials: true,
      })
      .then((group) => {
        let pointsToAdd = group.data.challenge.points;
        console.log(group.data.challenge.points)
        // Add points to every users
        let message = ""
        let congratulations = false;
        let updatedActualUser;
        members.forEach(user => {
          console.log(user)
          let clonedUser = JSON.parse(JSON.stringify(user));
          clonedUser.points += pointsToAdd;
          let newRank = this.handleRank(clonedUser.points);
          if (clonedUser.rank !== newRank) {
            clonedUser.rank = newRank;
            if (newRank === "Big Hero") clonedUser.points += 10000;
            if(clonedUser._id === this.state.loggedInUser._id){
              congratulations = true
              let bonus = this.handleBonus(newRank)
              message = `You're now a ${newRank}! 
              ${bonus}`
            }
          }
          if(clonedUser._id === this.state.loggedInUser._id) updatedActualUser = clonedUser;
          console.log(clonedUser);
          axios.patch(
              `${API_URL}/users/${clonedUser._id}/edit`,
              clonedUser,
              { withCredentials: true }
            )
            .then((response) => {
              console.log("user updated", response)
            });
        })
        this.setState(
          {
            loggedInUser: updatedActualUser,
            showGeneralModal: congratulations ? true : false,
            modalMessage : message,
            modalHeader: "Congratulations!",
            modalButtonType: "success"
          },
          this.props.history.push("/hero-home")
        );
      });
    };

  handleModalClose = () => {
    this.setState({
      showGeneralModal: false
    })
  }

  hanldeNotification = (aMessage) => {
    setTimeout(this.handleModalClose, 1500)
    this.setState({
      showGeneralModal: true,
      modalMessage : aMessage,
      modalHeader: "Youpi!",
      modalButtonStyle: {display: "none"}
    }, this.props.history.push("/goals-success"))
  }

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
              return <MyProfile loggedInUser={this.state.loggedInUser} onDelete={this.handleLogOut} {...routeProps}/>
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
              return <ChallengeDetails loggedInUser={this.state.loggedInUser} {...routeProps} onSuccess={this.hanldeNotification} />;
            }}/>
          <Route path="/user/:userID" render={(routeProps) => {
              return <OtherProfile {...routeProps} />;
            }}/>
          <Route path="/goals-edit/:achievementID" render={(routeProps) => {
              return <GoalsEdit onUpdate={this.handleUpdateGoal} {...routeProps} />
            }}/>
          <Route exact path="/groups" render={(routeProps) => {
              return <Groups loggedInUser={this.state.loggedInUser} {...routeProps} />
            }}/>  
           <Route path="/groups/create" render={(routeProps) => {
              return <GroupCreate onSubmit={this.handleCreateGroup} loggedInUser={this.state.loggedInUser} {...routeProps} />
            }}/>    
          <Route path="/groups/:groupID" render={(routeProps) => {
              return <GroupDetails loggedInUser={this.state.loggedInUser} {...routeProps} />
            }}/>  
          <Route path="/event-edit/:eventID" render={(routeProps) => {
              return <GroupEdit loggedInUser={this.state.loggedInUser} onUpdate={this.handleUpdateEvent} {...routeProps} />
            }}/>  
          <Route path="*" component={NotFoundPage} />    
        </Switch>
        <Modal className="modalContainer" show={this.state.showGeneralModal} onHide={this.handleModalClose} >
          <Modal.Header className="modalTitleContainer" closeButton style={this.state.modalButtonStyle}>
            <Modal.Title className="modalTitle">{this.state.modalHeader}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalText">
            {this.state.modalMessage}
          </Modal.Body>
          <Modal.Footer className="modalButtonsContainer" style={this.state.modalButtonStyle}>
            <Button className="buttonYes" variant={this.state.modalButtonType} onClick={this.handleModalClose}>
              Ok, got it
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withRouter(App);
