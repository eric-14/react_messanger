import React,{useState,useEffect}from 'react'
import io from 'socket.io-client';
import socketio from '@feathersjs/socketio-client';
import feathers from "@feathersjs/client";
import "./room.css"
import { Avatar } from '@material-ui/core';
import userEvent from '@testing-library/user-event';



function Rooms() {
    const [rooms, setRooms] = useState([])
    
      const socket = io("http://localhost:3030"
    ,{
        Headers:{
           Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2MDIyODM2MTEsImV4cCI6MTYwMjM3MDAxMSwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoic3p4aUNrNzdnTEwxYnJyViIsImp0aSI6IjVlM2Y4OGU3LTViM2ItNDUzYS04YmIyLTkyYTVjMDM2MDljYiJ9.sXGv6tUecLH-swQDf3D-wn7xKjfAzuMxpgfVtPfi4ds`
        }
    })   
    const client = feathers()
    client.configure(socketio(socket))
    useEffect(() => {
         client.service("user-room").find({
        $sort:{
            timestamp:1
        }
        }).then(obj=>(
            console.log(obj.data),
            setRooms(obj.data)))
        
    }, [])

    return (
        <div>
             <h3>🤡🌋ROOMS</h3>
             
       
        <div className="rooms" style={{
            backgroundColor:"white",
            width:"70vw",
            height:"70vh"

        }}>
           
             <div className="room">
                   {
                    rooms.map(room => 
                    <div className="room__name">
                        <p>{room.room_name}</p>
                    </div>
                
                )}

             </div>
             <div className="room__info">
                    <Avatar/>
                    <div className="no_of_users">
                        <p>number_of_users</p>
                    </div>
                    <div>
                        <p>Description</p>
                    </div>
                    
             </div>
              
        </div>
         </div>
    )
}

export default Rooms
