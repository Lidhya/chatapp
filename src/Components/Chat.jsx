import React, { useContext } from 'react';
import Messages from './Messages'; 
import Input from './Input'; 
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ChatContext } from '../Context/ChatContext';

const Chat = () => {
  const {data}= useContext(ChatContext)
    return (
        <div className='chat'>
            <div className="chatInfo">
              <div className='userChat'>
            {data.user?.photoURL && <img src={data.user.photoURL} alt="user" />}  
              <span>{data.user.displayName}</span>
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
