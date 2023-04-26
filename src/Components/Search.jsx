import React, { useEffect, useState } from "react";
import { where, collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(()=>{
    userName === "" && setUser(null)
  }, [userName])

  const handleSearch = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("displayName", "==", userName)
      );
      getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setUser(doc.data());
          });
        })
        .catch((error) => {
          setErr("User not found");
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
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
      {err && <p>{err}</p>}
      {user && (
        <div className="userChat">
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
