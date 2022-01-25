import React,{useState} from 'react'
import {Link} from "react-router-dom"
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';


function Login() {

    const app = feathers();
    // Connect to the same as the browser URL (only in the browser)
    // const restClient = rest();
    // Connect to a different URL
    const restClient = rest('http://localhost:3030')

    // Configure an AJAX library (see below) with that client 
    app.configure(restClient.fetch(window.fetch));

    // Connect to the `http://feathers-api.com/messages` service
    const users = app.service('users');
    const SignUp = async (email,password,first_name,last_name)=> 
        await users.create({
        "strategy": "local",
        "email": email,
        "first_name":first_name,
        "last_name":last_name,
        "password": password
    })

    
    const [ first_name,setFirst_name] = useState()
    const [ last_name,setLast_name] = useState("")
    const [ email,setEmail] = useState("")
    const [ password,setPassword] = useState("")
    const [confirm_password,setConfirm_password] =  useState("")

    

    
    
    const signing = (e)=>{
        e.preventDefault()
            console.log(first_name,last_name,email,password, confirm_password)
        const auth = SignUp(email,password,first_name,last_name)
                
        console.log(" 🎹📢💬 🎹📢💬🎹📢💬",auth)
    }

    return (
        <div class="login" style={{display:" grid",
                placeItems:" center",
                height: "100vh",
                minWidth:"100vh",
                overflow: "hidden",
                textAlign: "center",
                backgroundImage: 'linear-gradient( #D6DFE0,#868B8E)',
                backgroundColor: "red"}}>
            
            <div class="container" style={{ 
                    display:"flex",
                    flexDirection:"column",
                    flex:1,
                    justifyContent:"center",
                    alignItems:"center",
                    fontWeight:"bolder",
                    height:" 85vh",
                    width: "85vw",
                    backgroundColor: "#EAEAE0"}}>
                
                        <div class="row " style={{placeItems:"center"}}>
                            <form class="col s12">
                            <div class="row">
                                <div class="input-field col s4 ">
                                <input value={first_name} onChange={e => setFirst_name(e.target.value)} placeholder="First Name" id="first_name" type="text" class="validate" required></input>
                                <label for="first_name">First Name</label>
                                </div>
                                <div class="input-field col s4">
                                <input value={last_name} onChange={e => setLast_name(e.target.value)} id="last_name" type="text" class="validate" required></input>
                                <label for="last_name">Last Name</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s8">
                                <input value={email} onChange={e => setEmail(e.target.value)} id="email" type="email" class="validate" required></input>
                                <label for="email">Email</label>
                                </div>
                            </div>
                    
                            <div class="row">
                                <div class="input-field col s8">
                                <input value={password} onChange={e => setPassword(e.target.value)} id="password" type="password" class="validate" required></input>
                                <label for="password">Password</label>
                                </div>
                            
                            <div class="row">
                                
                                <div class="input-field col s8">
                                <input value={confirm_password} onChange={e => setConfirm_password(e.target.value)} id="password" type="password" class="validate" required></input>
                                <label for="password">Confirm_Password</label>
                                </div>
                            </div>
                            </div>
                        
                            </form>
                                
                                <div style={{
                                    padding:"10px"
                                }}>
                                     <button onClick={signing} class="waves-effect waves-light btn-small">Sign Up</button>
                                </div>

                                <div>
                                    <Link to="/SignIn">
                                         <button  class="waves-effect waves-light btn-small">Sign In  </button>
                                       
                                    </Link>
                                    
                                </div>
                           
                        </div>                                        
            </div>
        </div>
            
       
    )
}

export default Login
