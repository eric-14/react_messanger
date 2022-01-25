import React from 'react'
import "./header.css"
import ChatIcon from '@material-ui/icons/Chat';
import ContactsRoundedIcon from '@material-ui/icons/ContactsRounded';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import { IconButton } from '@material-ui/core';
import {Link} from 'react-router-dom'

function Header() {
    return (
        <div className="header">
            <Link to="/rooms">
                <IconButton >
                    <ContactsRoundedIcon/>
                </IconButton>
            </Link>
            
            <Link to="/chats">
                <IconButton>
                    <ChatIcon/>
                </IconButton>
            </Link>

        </div>
    )
}

export default Header
