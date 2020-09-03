import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import Loading from "./Loading"
import "./styles/Groups.css";

class Groups extends Component {
  state = {
    groups: [],
    filteredGroups: [],
    showPopUp: false,
  };

  componentDidMount() {
    axios
      .get(`${API_URL}/groups`, { withCredentials: true })
      .then((response) => {
        let futureEvents = response.data.filter(
          (e) => new Date(e.date) >= new Date(Date.now())
        );
        this.setState({
          groups: futureEvents,
          filteredGroups: futureEvents,
        });
      });
  }

  handleSearch = (e) => {
    let search = e.currentTarget.value.toLowerCase();
    let cloneGroups = this.state.groups.filter((item) => {
      return (
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
      );
    });
    this.setState({
      filteredGroups: cloneGroups,
    });
  };

  handleCreateClick = () => {
    if (!this.props.loggedInUser || this.props.loggedInUser.points < 10000) {
      this.setState({
        showPopUp: true,
      });
    } else this.props.history.push("/groups/create");
  };

  handleClose = () => {
    this.setState({
      showPopUp: false,
    });
  };

<<<<<<< HEAD
  handleSort = (e) => {
    e.preventDefault();
    let cloneGroups = JSON.parse(JSON.stringify(this.state.filteredGroups));
    e.currentTarget.value === "low"
      ? cloneGroups.sort((a, b) => a.points - b.points)
      : cloneGroups.sort((a, b) => b.points - a.points);
    this.setState({
      filteredGroups: cloneGroups,
    });
  };

  render() {
    if (!this.state.groups || !this.props.loggedInUser) {
      return (
        <p>
          Loading... If you're not login yet, please{" "}
          <Link to="/login">click on this link</Link>
        </p>
      );
=======
    handleSearch = (e) => {
        let search = e.currentTarget.value.toLowerCase();
        let cloneGroups = this.state.groups.filter((item) => {
          return (
            item.name.toLowerCase().includes(search) ||
            item.description.toLowerCase().includes(search) ||
            item.location.toLowerCase().includes(search)
          );
        });
        this.setState({
            filteredGroups: cloneGroups,
        });
    };
    
    handleCreateClick = () => {
        if (!this.props.loggedInUser || this.props.loggedInUser.points < 10000) {
          this.setState({
            showPopUp: true,
          });
        } else this.props.history.push("/groups/create");
    };
    
    handleClose = () => {
        this.setState({
          showPopUp: false,
        });
    };
    
    handleSort = (e) => {
        e.preventDefault()
        let cloneGroups = JSON.parse(JSON.stringify(this.state.filteredGroups)) 
        e.currentTarget.value ==="low" ? 
        cloneGroups.sort((a, b) => {
            if(b.date < a.date) {
                return -1
            } else if (b.date > a.date) {
                return 1
            } else {
                return 0
            }
        })
         :
        cloneGroups.sort((a, b) => {
            if(a.date < b.date) {
                return -1
            } else if (a.date > b.date) {
                return 1
            } else {
                return 0
            }
        })

        this.setState({
            filteredGroups: cloneGroups,
        })
>>>>>>> origin/Joel-branch
    }

<<<<<<< HEAD
    return (
      <div id="groups">
        <h3 className="groupsTitle">EcoHero Events</h3>
=======
    render() {
        if (!this.state.groups) {
            return <Loading/>
        }
>>>>>>> origin/Joel-branch

        <div className="search-part">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">&#128270;</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={this.handleSearch}
              placeholder="Search for an event"
              aria-label="Search for an event"
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <Form.Control
            onChange={this.handleSort}
            as="select"
            defaultValue="Sort by..."
          >
            <option>Sort by...</option>
            <option value="high">Points - high to low </option>
            <option value="low">Points - low to high</option>
          </Form.Control>
          {this.props.loggedInUser ? (
            <Button className="bouncy" onClick={this.handleCreateClick}>
              <img className="plantL" src="/images/plant02.png" alt="o" />
              Create an event
            </Button>
          ) : (
            ""
          )}
        </div>

<<<<<<< HEAD
        <h4 className="listOfEvents">List of events</h4>
        <div className="one-success-container">
          {this.state.filteredGroups.map((group, i) => {
            let fullDate = new Date(group.date);
            let date = "0" + fullDate.getDate();
            let month = "0" + (fullDate.getMonth() + 1);
            fullDate = date.slice(-2) + "/" + month.slice(-2);
            return (
              <Link className="link" to={`/groups/${group._id}`}>
                <div className="one-success" key={"group" + i}>
                  <div className="event-date">{fullDate}</div>
                  <div className="event-name">{group.name}</div>
                  <div className="event-location">{group.location}</div>
=======
                <Form.Control onChange={this.handleSort} as="select" defaultValue="Sort by...">
                    <option>Sort by...</option>
                    <option value="high">Date - now to future </option>
                    <option value="low">Date - future to now</option>
                </Form.Control>
                {this.props.loggedInUser ? (
                <Button className="bouncy" onClick={this.handleCreateClick}>
                    <img className="plantL" src="/images/plant02.png" alt="o" />
                    Create an event
                </Button>
                ) : (
                ""
                )}
                </div>
                
                <h4 className="listOfEvents">List of events</h4>
                <div className="one-success-container" >
                {this.state.filteredGroups.map((group, i) => {
                return (
                    <div className="one-success" key={"group" + i}>
                        <Link className="link" to={`/groups/${group._id}`}>
                        <p>
                            {group.name} - {group.location}
                        </p>
                        </Link>
                    </div>
                    
                );
                })}
>>>>>>> origin/Joel-branch
                </div>
              </Link>
            );
          })}
        </div>
        <Modal show={this.state.showPopUp} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Not yet!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Achieve Chill Hero rank in order to do that &#x1F609;{" "}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={this.handleClose}>
              Ok, got it
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Groups;
