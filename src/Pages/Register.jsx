import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import "../style.scss";
import ImageIcon from "@mui/icons-material/Image";

const Register = () => {
  const [err, setErr] = useState("");
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const errMessage = "Something went wrong";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)

    const firstName = e.target[0]?.value? e.target[0].value : null ;
    const email = e.target[1]?.value? e.target[1].value : null;
    const password = e.target[2]?.value? e.target[2].value : null;
    const file = e.target[3]?.files[0]? e.target[3].files[0] : null;

    try {
      if (firstName && email && password && file) {
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
                      displayName: firstName,
                      photoURL: downloadURL,
                    })
                      .then(() => {
                        setDoc(doc(db, "users", userCredential.user.uid), {
                          uid: userCredential.user.uid,
                          displayName: firstName,
                          email,
                          photoURL: downloadURL,
                        })
                          .then(() => {
                            setDoc(doc(db, "userChat", userCredential.user.uid),{})
                            .then(() => {
                              navigate("/")
                            }).catch((error) => {
                              setErr(errMessage);
                              setSubmitting(false)
                              console.log(error.message);
                            });
                          })
                          .catch((error) => {
                            setErr(errMessage);
                            setSubmitting(false)
                            console.log(error.message);
                          });
                      })
                      .catch((error) => {
                        console.log(error.message);
                        setErr(errMessage);
                        setSubmitting(false)
                      });
                  })
                  .catch((error) => {
                    console.log(error.message);
                    setErr(errMessage);
                    setSubmitting(false)
                  });
              })
              .catch((error) => {
                console.log(error.message);
                setErr(errMessage);
                setSubmitting(false)
              });
          })
          .catch((error) => {
            setErr(errMessage);
            setSubmitting(false)
            const errorMessage = error.message;
            console.log(errorMessage);
          });
      } else {
        switch(true) {  
          case (firstName==null): setErr("Enter a valid name");
          break;
          case (email==null): setErr("Enter a valid email");
          break; 
          case (password==null || password.length <6): setErr("Pasword should be at least 6 characters");
          break; 
          case (file==null): setErr("Image is required");
          break;   
          default: setErr(errMessage);
        }
    setSubmitting(false)
      }
    } catch (error) {
      console.log(error.message);
      setErr(errMessage);
    }
  };
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1 className="title">MyChatApp</h1>
        {err && <span>{err}</span>}
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
          <button className="submit-button" type="submit" disabled={submitting} >
           {submitting? "Loading..." : "Submit"} 
            </button>
          <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
