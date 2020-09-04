import React from 'react'
import {FacebookShareButton, TwitterShareButton, WhatsappShareButton} from "react-share";
import {FacebookIcon, TwitterIcon, WhatsappIcon} from "react-share";
import "./styles/SocialMedia.css";






export default function SocialMedia(props) {


    return (
        
      <div id="socialMedia" >
      <div className="sharing-logo">
        <FacebookShareButton className="sharing-logo" url={`https://eco-hero.herokuapp.com/achievements/${props.achievementID}`} quote={"Hey! I have achieved this challenge at Eco-Hero! Check it out!"}><FacebookIcon size={30} /></FacebookShareButton>
      </div>

      <div className="sharing-logo">
        <TwitterShareButton className="sharing-logo" url={`https://eco-hero.herokuapp.com/achievements/${props.achievementID}`} title={"My new Success in EcoHero"}><TwitterIcon size={30} /></TwitterShareButton>
      </div>

      <div className="sharing-logo">
        <WhatsappShareButton className="sharing-logo" url={`https://eco-hero.herokuapp.com/achievements/${props.achievementID}`} title={"Hey! I have achieved this challenge at Eco-Hero! Check it out!"}><WhatsappIcon size={30} /></WhatsappShareButton> 
      </div>
    </div>
            
     
    )
}
