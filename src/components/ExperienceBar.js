import React from 'react'
import ProgressBar from "react-bootstrap/ProgressBar"
import "./styles/ExperienceBar.css"


function ExperienceBar(props) {

    let newHero = {
        title: "New Hero",
        points: 0
    }

    let chillHero = {
        title: "Chill Hero",
        points: 10000
    }

    let smartHero = {
        title: "Smart Hero",
        points: 25000
    }

    let bigHero = {
        title: "Big Hero",
        points: 50000
    }

    let superHero = {
        title: "Super Hero",
        points: 100000
    }

    
                 //------------ Conditions from Chill Hero to Smart Hero ---------------// //
    if (props.loggedInUser.points >= 10000 && props.loggedInUser.points < 25000) {
        let percentage = Math.ceil((props.loggedInUser.points - chillHero.points)/(smartHero.points - chillHero.points) *100)
        return (
            <div>
                <div className="ranksContainer">
                    <p className="ranks">{chillHero.title}</p>
                    <ProgressBar className="progress" striped variant="success" now={percentage}/>
                    <p className="ranks">{smartHero.title}</p>
                </div>
              <p className="points">{props.loggedInUser.points}/{smartHero.points} points</p>    
            </div>
        ) 
                  //------------ Conditions from Smart Hero to Big Hero ---------------//
    } else if (props.loggedInUser.points >= 25000 && props.loggedInUser.points < 50000) {
        let percentage = Math.ceil((props.loggedInUser.points - smartHero.points)/(bigHero.points - smartHero.points) *100)
        return (
            <div>
                <div className="ranksContainer">
                    <p className="ranks">{smartHero.title}</p>
                    <ProgressBar className="progress" striped variant="success" now={percentage}/>
                    <p className="ranks">{bigHero.title}</p>
                </div>
              <p className="points">{props.loggedInUser.points}/{bigHero.points} points</p>    
            </div>
        ) 
                   //------------ Conditions from Big Hero to Super Hero ---------------//
    } else if (props.loggedInUser.points >= 50000 && props.loggedInUser.points < 100000) {
        let percentage = Math.ceil((props.loggedInUser.points - bigHero.points)/(superHero.points - bigHero.points) *100)
        return (
            <div>
                <div className="ranksContainer">
                    <p className="ranks">{bigHero.title}</p> 
                    <ProgressBar className="progress" striped variant="success" now={percentage}/> 
                    <p className="ranks">{superHero.title}</p>
                </div>
              <p className="points">{props.loggedInUser.points}/{superHero.points} points</p>    
            </div>
        ) 
                        //------------ Conditions for Super Hero ---------------// 
    } else if (props.loggedInUser.points >= 100000) {
        return (
            <div>
              <p className="ranks">{superHero.title}</p>
              <p className="points">{props.loggedInUser.points} points</p>    
            </div>
        ) 
                   //------------ Conditions from New Hero to Chill Hero ---------------// 
    } else {
        let percentage = Math.ceil((props.loggedInUser.points)/(chillHero.points) *100)
        return (
            <div>
                <div className="ranksContainer">
                    <p className="ranks">{newHero.title}</p> 
                    <ProgressBar className="progress" striped variant="success" now={percentage}/> 
                    <p className="ranks">{chillHero.title}</p> 
                </div>
              <p className="points">{props.loggedInUser.points}/{chillHero.points} points</p>    
            </div>
        )
    }


    
}

export default ExperienceBar



