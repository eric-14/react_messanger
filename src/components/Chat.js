import React,{useState,useEffect} from 'react'
import "./chat.css"
import Avatar from '@material-ui/core/Avatar';
import Header from './Header';

import io from 'socket.io-client';

import socketio from '@feathersjs/socketio-client';
import feathers from "@feathersjs/client";
import store from "../Redux/store"
import { useHistory, useParams } from 'react-router-dom';


const API_URL = process.env.API_URL




function Chat() {
    const store_state = store.getState()
    const [user,setUser] = useState({})
    const [message,setMessage] = useState([]) 
    const [input_text,setInput_text] = useState("")
    const [messages,setMessages] = useState([]) 
    const [rooms,setRooms] = useState([]) 
    const [roomID,setRoomID] = useState() 
    const [permission, setPermission] = useState()
    const history = useHistory()
    
    let default_room
    
     store_state.user.then( async obj=> (
        // console.log("🥱🥱🥱🥱 >>>>>>>>>>>>>",obj.user),
         await setUser(obj.user)
    ))
    console.log("🥱🥱🥱🥱 >>>>>>>>>>>>>",user._id)
   
    // const promise_back = user.user.then(obj => console.log(obj.accessToken) )

   // console.log(">>>>>",user.user.then(obj =>obj.accessToken))
    

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
            query:{
                $sort:{
                    timestamp:1
                }
            }
        }).then(obj=>(
                setRooms(obj.data)
        ))
        }, [])
    useEffect(() => {
    client.service("messages").find({
        query:{
            user_room:{
                $in:[roomID]
            },
            $sort:{
                timestamp:1
            }
        }}
    ).then(obj=>(
            setMessages(obj.data)
    )).catch(err => console.log("error message FIND👽",err))
    }, [roomID])

    console.log(" rooms>>>>>>>🗣🗣 👅",rooms)
    
    // control the messages do that evry time we enter a character
    // it does not refresh

      console.log("🧑🏿‍🦳👂🏿🖐 ROOM ID >>>>",roomID)
      useEffect(() => {
          setPermission(" ")
      }, [roomID])

    const send__message =async (e)=> {
        e.preventDefault()
        const user = await store_state.user.then(obj=> obj.user._id)
        console.log("Send message USER 👻👻>>>>>>>>>",user)
        if(user){
            client.service("room-user-mod").find({
                query:{
                    user_room:{
                        $in:[roomID]
                    },
                    user_id:{
                        $in:[user]

                    }}
            }).then(status => {
                console.log("👽🧯🥶 line 102",status.data[0].mod_status )
                if(status.data[0].mod_status === "w"){

                        if(input_text.length !== 0 ){
                                client.service("messages").create({
                                text:input_text,
                                user_room:roomID,
                                sender_id:user
                            })
                            .then((obj) => (
                                setMessage(obj))
                            ) 
                            .catch(err=>console.log("🤖🤖🤖🤖🤖🤖🤖🤖🤖",err))
                            setInput_text(" ")
                        
                        }
                    }else{
                        setPermission("NOT PERMITTED TO SEND MESSAGES IN THIS ROOM ☠️😤👣")
                        console.log("NOT PERMITTED TO SEND MESSAGES IN THIS ROOM ☠️😤👣")
                    }

                }).catch(err => console.log("trying to verifiy my mod status",err))
                
        }}
    console.log("<<<<<<<<<<<<",messages)
    return (
        <div style={{display:"flex",
                    flexDirection:"column",
                    backgroundColor:"white",
                    minWidth:"65vw",
                    maxWidth:"70vw"
                    }}>
        
         <Header/>
        <div className="chat">
            <div className="chat__left">

                {rooms.map(room => 
                    <div onClick={(e)=>{
                            e.preventDefault()
                            default_room = room._id
                            console.log("👅👥👁💋",room._id)
                            setRoomID(room._id)
                        }
    
                    } key={room._id} className="chat__info">
                        <Avatar/>
                        <span>{room.room_name}</span>
                        <span className="chat__time">{room.join_data}</span>
                </div>
                )

                }
               


            </div>
            <div className="chat__messages">
                <div className="chat__room">

                        {messages.map(message => 
                            <div key={message._id} className={message?.sender_id === user?._id ? "sent__message": "received__message"}>
                                <p className="message">{message?.text}</p>
                                <span className="message__timestamp">{message?.timestamp}</span>
                          </div> 
                            
                        )} 
                    
                </div>
                  <div className="input__message">
                      {
                          permission ? (
                                <p className="permission__message">{permission}</p>
                          ):null
                      }
                      
                            <form  onSubmit={send__message} >
                                <input onSubmit={send__message} value={input_text} onChange={e=>setInput_text(e.target.value)} className="enter__message" name="message" placeholder="enter message"></input> 
                            </form>
                </div>
                   
            </div>
        </div>
            
        </div>
  
    )
}

export default Chat
