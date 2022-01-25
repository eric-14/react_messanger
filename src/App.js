import React from 'react';
import { BrowserRouter as Router,Redirect,Route, Switch, useHistory } from 'react-router-dom'
import './App.css';
import Chat from './components/Chat';
import Header from './components/Header.js';
import Login from './components/Login';
import SignIn from './components/SignIn'
import store from "./Redux/store"
import Home from "./components/Home"
import NotFoundPage from './components/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import Rooms from './components/Rooms';

function App() {
  store.subscribe(()=>
     console.log("👻😻😽",store.getState())
   
  )
  

  return  (
   
      <div className="App">
       
             <div className="App__body">
                <Router>
                  <Switch>
                      <ProtectedRoute exact path="/chat" component={Chat}/>
                      <ProtectedRoute exact path="/rooms" component={Rooms}/>
                      {/* <Route path="/chat">
                          
                          <Chat/>
                      </Route> */}
            
                      <Route path="/SignIn">
                              <SignIn/>
                          </Route>

                         <Route path="/SignUp">
                                <Login/> 
                        </Route>
                         <Route path="/:no__found">
                                <NotFoundPage/>
                        </Route>
                          
                          
                      <Route path="/">
                            <Home />
                        </Route>
                      
                </Switch>
              </Router>
              </div>
  
    </div>
     
 )
}

export default App;
