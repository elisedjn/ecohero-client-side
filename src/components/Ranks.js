import React, { Component } from 'react'

class Ranks extends Component {
    render() {
        return (
            <div>
                <div>
                    <h5>New Hero</h5>
                    <p>0-9.999 points</p>   
                </div>

                <div>
                  <div>
                    <h5>Chill Hero</h5>
                    <p>10.000-24.999 points</p>   
                  </div>  
                <p>Perks: Create groups</p>
                </div>

                <div>
                  <div>
                    <h5>Smart Hero</h5>
                    <p>25.000-49.999 points</p>   
                  </div>
                <p>Perks: Create challenges</p>   
                </div>

                <div>
                  <div>
                    <h5>Big Hero</h5>
                    <p>50.000-99.999 points</p>  
                  </div>
                <p>Perks: 10.000 Bonus points</p>  
                </div>

                <div>
                  <div>
                    <h5>Super Hero</h5>
                    <p>100.000+ points</p>   
                  </div>
                <p>Perks: Nice surprises</p>
                </div>    
            </div>
        )
    }
}

export default Ranks
