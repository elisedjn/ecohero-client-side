import React from 'react'



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

    if (props.loggedInUser.points >= 10000 && props.loggedInUser.points < 25000) {
        return (
            <div>
              <p>{chillHero.title}------------{smartHero.title}</p>
              <p>{props.loggedInUser.points}/{smartHero.points} points</p>    
            </div>
        ) 
    } else if (props.loggedInUser.points >= 25000 && props.loggedInUser.points < 50000) {
        return (
            <div>
              <p>{smartHero.title}------------{bigHero.title}</p>
              <p>{props.loggedInUser.points}/{bigHero.points} points</p>    
            </div>
        ) 
    } else if (props.loggedInUser.points >= 50000 && props.loggedInUser.points < 100000) {
        return (
            <div>
              <p>{bigHero.title}------------{superHero.title}</p>
              <p>{props.loggedInUser.points}/{superHero.points} points</p>    
            </div>
        ) 
    } else if (props.loggedInUser.points >= 100000) {
        return (
            <div>
              <p>{superHero.title}</p>
              <p>{props.loggedInUser.points} points</p>    
            </div>
        ) 
        
    } else {
        return (
            <div>
              <p>{newHero.title}------------{chillHero.title}</p>
              <p>{props.loggedInUser.points}/{chillHero.points} points</p>    
            </div>
        )
    }


    
}

export default ExperienceBar