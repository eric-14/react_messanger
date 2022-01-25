import React,{useState} from 'react'
import { Redirect, useHistory } from 'react-router-dom'
// import store from "../Redux/store"

import io from 'socket.io-client';

import socketio from '@feathersjs/socketio-client';
import feathers from "@feathersjs/client";

import store from "../Redux/store"



function SignIn() {
    const [ email,setEmail] = useState("")
    const [ password,setPassword] = useState("")
    
    const history = useHistory()

    //const API_URL = process.env.API_URL
    const socket = io("http://localhost:3030") //API_URL
    const client = feathers()
    client.configure(socketio(socket))
    client.configure(feathers.authentication({
            storage: window.localStorage
    }))
    const login = async (email,password) => {
    try {
    // First try to log in with an existing JWT

      return await client.reAuthenticate()
      
    }
   
   catch (error) {
    // If that errors, log in with email/password
    // Here we would normally show a login page
    // to get the login information
     return await client.authenticate({
      strategy: 'local',
       email: email,//'hello@feathersjs.com',
      password:password// 'supersecret'
    })
    //display this in the main page
   
  }
};

       const logging_in =  (e) => {
           console.log("🔦💡 >>>",email,password)
           e.preventDefault()

          const auth = login(email,password).then(
            document.getElementById("error__message").style.display ="none"
          ).catch(err => {
            console.log("🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈",err.message)
            // document.getElementById("error__message").style.display ="block"
            // document.getElementById("error__message").innerText = err.message
          })

            setEmail(" ")
            setPassword(" ")

             client.logout()

            if(auth.user !== null){
               console.log("🥶🥶🤡😈 🤡😈 🤡😈",auth)
               store.dispatch({type:"ADD_USER",user:auth})
               return history.push("/chat")
            }else{
                console.log("user is undefined🤠💀👻👾")
            }}
    
  return (

        <div className="login" style={{display:" grid",
                placeItems:" center",
                height: "100vh",
                minWidth:"100vh",
                overflow: "hidden",
                textAlign: "center",
                backgroundImage: 'linear-gradient( #D6DFE0,#868B8E)',
                backgroundColor: "red"}}>
                    <h1>Sign in page <span role="img">☀️☃️</span></h1>
            
            <div className="container" style={{ 
                    display:"flex",
                    flexDirection:"column",
                    flex:1,
                    justifyContent:"center",
                    alignItems:"center",
                    fontWeight:"bolder",
                    height:" 75vh",
                    width: "85vw",
                    backgroundColor: "#EAEAE0"}}>
                
                        <div class="row " style={{placeItems:"center"}}>
                              <p id="error__message" style={{fontWeight:"lighter",color:"red",display:"none"}}></p>
 
                            <form class="col s12">
 
                            <div class="row">
                                <div class="input-field col s8">
                                <input value={email} onChange={e => setEmail(e.target.value)} id="email" type="email" class="validate"></input>
                                <label for="email">Email</label>
                                </div>
                            </div>

                             <div class="row">
                                <div class="input-field col s8">
                                <input value={password} onChange={e => setPassword(e.target.value)} id="password" type="password" class="validate"></input>
                                <label for="password">Password</label>
                                </div>
                            
                            </div>
                         
                            </form>
                                <button onClick={logging_in} class="waves-effect waves-light btn-small">Sign In</button>
                              </div>                                       
                          </div>
                         </div>
            
       
    )
}

export default SignIn
