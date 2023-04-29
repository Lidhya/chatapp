import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { ChatContext } from "../Context/ChatContext";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

 useEffect(() => {
   
    if (data.chatId) {
       const unSub = onSnapshot(doc(db, "chats", data?.chatId), (doc) => {
         doc.exists() && setMessages(doc.data().messages);
       });
   
       return () => {
         unSub();
       };
    } 
  }, [data]);

  return (
    <div className="messages">
      {messages[0]? messages.map((m) => (
        <Message message={m} key={m.id} />
      )):
     <div className="start"> <p>Start a converstation</p></div>
      }
    </div>
  );
};

export default Messages;
