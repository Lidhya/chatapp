import React from 'react';
import Messages from './Messages'; 
import Input from './Input'; 
import user1 from "../assests/pexels-gilberto-olimpio-3686216.jpg"
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Chat = () => {
    return (
        <div className='chat'>
            <div className="chatInfo">
              <div className='userChat'>
              <img src={user1} alt="user" />
              <span>user name</span>
        </div>
        <div className="chatIcons">
          <VideocamIcon/>
          <PersonAddIcon/>
          <MoreVertIcon />
        </div>
      </div>
      <Messages/>
      <Input/>
        </div>
    );
};


export default Chat;
