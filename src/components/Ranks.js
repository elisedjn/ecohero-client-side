import React, { Component } from 'react'
import "./styles/Ranks.css";

class Ranks extends Component {
    render() {
        return (
            <div className="listContainer">
              <h4 className="rankTitle">Ranking System</h4>
              <div className="rankContainer">
                <div className="rankAlign">
                    <h5><strong>New Hero</strong></h5>
                    <p>0-9.999 points</p>   
                </div>
              </div>
                

                <div className="rankContainer">
                  <div className="rankAlign">
                    <h5><strong>Chill Hero</strong></h5>
                    <p>10.000-24.999 points</p>   
                  </div>  
                <p className="perks"><strong>Perks:</strong> Create events</p>
                </div>

                <div className="rankContainer">
                  <div className="rankAlign">
                    <h5><strong>Smart Hero</strong></h5>
                    <p>25.000-49.999 points</p>   
                  </div>
                <p className="perks"><strong>Perks:</strong> Create challenges</p>   
                </div>

                <div className="rankContainer">
                  <div className="rankAlign">
                    <h5><strong>Big Hero</strong></h5>
                    <p>50.000-99.999 points</p>  
                  </div>
                <p className="perks"><strong>Perks:</strong> 10.000 Bonus points</p>  
                </div>

                <div className="rankContainer">
                  <div className="rankAlign">
                    <h5><strong>Super Hero</strong></h5>
                    <p>100.000+ points</p>   
                  </div>
                <p className="perks"><strong>Perks:</strong> Nice surprises</p>
                </div>    
            </div>
        )
    }
}

export default Ranks
