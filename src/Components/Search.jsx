import React, { useContext, useEffect, useState } from "react";
import {
  where,
  collection,
  query,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../Context/AuthContext";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const errMessage = "something went wrong"

  useEffect(() => {
    if (userName === "") {
      setUser(null);
      setErr(null);
    }
  }, [userName]);

  const handleSearch = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("displayName", "==", userName)
      );
      getDocs(q)
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            return setErr("User not found");
          }
          querySnapshot.forEach((doc) => {
            setUser(doc.data());
          });
        })
        .catch((error) => {
          setErr(errMessage);
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
      setErr(errMessage);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      getDoc(doc(db, "chats", combinedId))
        .then((res) => {
          if (!res.exists()) {
            setDoc(doc(db, "chats", combinedId), { messages: [] })
              .then(async () => {
                await updateDoc(doc(db, "userChat", currentUser.uid), {
                  [combinedId + ".userInfo"]: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                  },
                  [combinedId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChat", user.uid), {
                  [combinedId + ".userInfo"]: {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                  },
                  [combinedId + ".date"]: serverTimestamp(),
                });
              })
              .catch((error) => {
                console.log(error.message);
                setErr(errMessage);
              });
          }
        })
        .catch((error) => {
          console.log(error.message);
          setErr(errMessage);
        });
    } catch (error) {
      console.log(error.message);
      setErr(errMessage);
    }

    setUser(null);
    setUserName("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a friend"
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      {err && <p className="userChatInfo">{err}</p>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
