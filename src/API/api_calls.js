
import io from 'socket.io-client';

import socketio from '@feathersjs/socketio-client';
import feathers from "@feathersjs/client";



const API_URL = process.env.API_URL


const socket = io("http://localhost:3030") //API_URL

const client = feathers()


client.configure(socketio(socket))

export default client 

// client.configure(feathers.authentication({
//         storage: window.localStorage
// }))
// const login = async (email,password) => {
//   try {
//     // First try to log in with an existing JWT

//       return await client.reAuthenticate()
      
//     }
   
//    catch (error) {
//     // If that errors, log in with email/password
//     // Here we would normally show a login page
//     // to get the login information
//      return await client.authenticate({
//       strategy: 'local',
//        email: email,//'hello@feathersjs.com',
//       password:password// 'supersecret'
//     }).then(
//        document.getElementById("error__message").style.display ="none",
  
       
//     ).catch(err => {
//       console.log("🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈",err.message)

//       document.getElementById("error__message").style.display ="block"
//       document.getElementById("error__message").innerText = err.message
    

//     } )
//     //display this in the main page
   
//   }
// };
// export default  async (email,password) => {

//   const auth =  await login(email,password);

//   // console.log('User is authenticated', auth);

//   if(auth){
//     console.log(" 🔍📆🔍📆🔍📆🔍📆🔍📆",auth.user)

//     store.dispatch({type:"ADD_USER",user:auth.user})

     
//      await client.logout();

     

//     // window.location.replace("http://localhost:3000")
//      const user = store.getState() 
    
//      console.log("🔵🟣🔴 🔵🟣🔴🔵 🟣🔴🔵🟣🔴 store value >>>> user.user",user.user)

//   }
  
  

//   // Log us out again
//    await client.logout();
// };



