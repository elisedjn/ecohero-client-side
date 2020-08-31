import React from "react";
import "./styles/About.css";

function About() {
  return (
    <div id="about">
      <h5>About us</h5>
      <div className="white-bg">
        <div className="subtitle">Hello world!</div>
        <p className="about-text">
          We are <a href="https://www.linkedin.com/in/elise-dujardin/" target="_blank" rel="noopener noreferrer" >Elise Dujardin</a> & <a href="https://www.linkedin.com/in/joel-roca-martinez-80b63629/" target="_blank" rel="noopener noreferrer" >Joel Roca Martinez</a> - Web Developers & IronHackers - and we are
          super excited to have you here!
        </p>
        <p className="about-text">
          <strong>Welcome to EcoHero</strong>, a platform that we have created
          in order to revert the destruction that humanity is creating in our
          planet. In here you will find a community of people that work with
          passionand perseverance in{" "}
          <strong>making Planet Earth a better place to live in</strong> ,
          today, and tomorrow.
        </p>
        <p className="about-text">
          Join us in this frenetic quest and{" "}
          <strong>start today creating and sharing your impact!</strong>
        </p>
      </div>
    </div>
  );
}

export default About;
