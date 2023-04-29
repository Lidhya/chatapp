import React, { useContext, useState } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import { ChatContext } from "../Context/ChatContext";
import { AuthContext } from "../Context/AuthContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import {v4 as uuid} from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


const Input = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [img, setImg] = useState(null);
  const [text, setText] = useState("");

  const sendMessage =async () => {
    if (img) {

      const storageRef = ref(storage, data.chatId);
      uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef)
          .then(async (downloadURL) => {
            updateDoc(doc(db, "chats", data.chatId),{
              messages:arrayUnion({
                id:uuid(),
                text,
                senderId:currentUser.uid,
                date: Timestamp.now(),
                img:downloadURL
              })
            })
          })
          .catch((error) => {
            console.log(error.message);
          });
      })

    }else  {
      updateDoc(doc(db, "chats", data.chatId),{
        messages:arrayUnion({
          id:uuid(),
          text,
          senderId:currentUser.uid,
          date: Timestamp.now()
        })
      })
    }

    await updateDoc(doc(db, "userChat", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
       text : text? text: (img? "Photo" : "")
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChat", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
       text : text? text: (img? "Photo" : "")
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("")
    setImg(null)

  };

  const handleSend = ()=>{
    if(text.length !== 0 || img !== null )
    sendMessage()
  }

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="icons">
        <div className="attach-image-icon">
          <AttachFileRoundedIcon />
          <label htmlFor="file">
            <ImageRoundedIcon />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <button onClick={handleSend}>
          <SendRoundedIcon className="sendIcon" />
        </button>
      </div>
    </div>
  );
};

export default Input;
