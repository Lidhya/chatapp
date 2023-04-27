import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../Context/AuthContext";

const Chats = () => {
  const [chats, setChats] = useState("");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    function getChats() {
      const unsub = onSnapshot(doc(db, "userChat", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    }
    currentUser.uid && getChats();
    console.log(Object.entries(chats));
  }, [currentUser.uid]);

  return (
    <div className="chats">
      {Object.entries(chats).map((chat) => (
        <div className="userChat" key={chat[0]}>
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
