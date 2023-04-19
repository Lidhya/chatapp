import React from 'react';
import Message from './Message';


const Messages = () => {
    return (
        <div className='messages'>
            <Message classname={"owner"}/> 
            <Message/> 
            <Message/> 
            <Message/> 
            <Message/> 
            <Message/> 
            <Message classname={"owner"}/> 
            <Message/> 
            <Message/> 
            <Message/> 
            <Message classname={"owner"}/> 
            <Message/> 
            <Message/> 
            <Message/> 
        </div>
    );
}

export default Messages;
