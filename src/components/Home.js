import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"
import logo from "./logo.jpeg"
function Home() {
    return (
            <>
            <div className="logo">
                <img className="logo__image"src={logo}></img>
                <p>turn it into an svg and make it a good logo using figma</p>
            </div>
            
            {/* <h1><span role="img">⚖️🎥</span></h1> */}
        
        <div className="Home">
            
            <div className="Home__next" style={{
                display:"flex",
              
                flex:1
            }}>
                  <Link to="/SignUp"> 
                    <button style={{marginRight:"20px"}}  class="waves-effect waves-light btn-small">Sign Up</button>
                </Link>
                
                <Link to="/SignIn">
                    <button class="waves-effect waves-light btn-small">Sign In</button>
                </Link>
            </div>
        </div>
        </>
    )
}

export default Home
