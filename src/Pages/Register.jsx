import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import "../style.scss";
import ImageIcon from "@mui/icons-material/Image";

const Register = () => {
  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          console.log(userCredential);
          const date = new Date().getTime();
          const storageRef = ref(storage, `${firstName + date}`);
          uploadBytesResumable(storageRef, file)
            .then(() => {
              getDownloadURL(storageRef)
                .then(async (downloadURL) => {
                  console.log("File available at", downloadURL);
                  updateProfile(userCredential.user, {
                    firstName,
                    photoURL: downloadURL,
                  })
                    .then(() => {
                      setDoc(doc(db, "users", userCredential.user.uid), {
                        uid: userCredential.user.uid,
                        firstName,
                        email,
                        photoURL: downloadURL,
                      })
                        .then(() => console.log("success"))
                        .catch((error) => console.log(error.message));
                    })
                    .catch((error) => {
                      console.log(error.message);
                      setErr(true);
                    });
                })
                .catch((error) => {
                  console.log(error.message);
                  setErr(true);
                });
            })
            .catch((error) => {
              console.log(error.message);
              setErr(true);
            });
        })
        .catch((error) => {
          setErr(true);
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    } catch (error) {
      console.log(error.message);
      setErr(true);
    }
  };
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1 className="title">MyChatApp</h1>
        {err && <span>something went wrong</span>}
        <form onSubmit={handleSubmit} className="register-form">
          <label htmlFor="firstName">First name</label>
          <input type="text" name="firstName" id="firstName" />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
          <label htmlFor="file-upload" className="file-upload-label">
            <ImageIcon />
            Upload Profile Picture
            <input type="file" name="file-upload" id="file-upload" />
          </label>
          <input className="submit-button" type="submit" />
          <p>Already have an account? Login</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
