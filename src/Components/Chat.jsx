import React from 'react';
import Messages from './Messages'; 
import Input from './Input'; 
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Chat = () => {
    return (
        <div className='chat'>
            <div className="chatInfo">
        <span>user name</span>
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
