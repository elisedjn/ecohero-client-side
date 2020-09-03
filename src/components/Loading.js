import React, { Component } from 'react'
import { Link } from "react-router-dom";

import "./styles/Loading.css";




export default class Loading extends Component {


    render() {

        return (

            <div>
              <div className="loadingTitle">
                <h3>Loading...</h3>

              </div>

              <div className="container">
                <div className="dash uno"></div>
                <div className="dash dos"></div>
                <div className="dash tres"></div>
                <div className="dash cuatro"></div>
              </div>

              <div className="loadingRedirect">
                <p>If you're not logged in yet, please {" "} <Link to="/login">click on this link</Link></p>
              </div>
            </div>
          
        )
    }
}
