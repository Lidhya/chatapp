import React from 'react';
import user1 from "../assests/pexels-gilberto-olimpio-3686216.jpg"

const Message = ({classname}) => {
    return (
      <div className={`message ${classname && "owner"}`}>
        <div className="messageInfo">
        <img src={user1} alt="user" />
        <span>just now</span>
        </div>
        <div className='messageContent'>
          <span> afasdfsdsdg </span> 
          <img src={user1} alt="user" />
        </div>
        </div>
    );
};




export default Message;
