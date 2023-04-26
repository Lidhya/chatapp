import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../style.scss"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
    const [err, setErr] = useState("");
   const errMessage="Something went wrong"
   const navigate=useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        const email=e.target[0]?.value? e.target[0].value : null;
        const password=e.target[1]?.value? e.target[1].value : null;
    
     if (email && password) {
          try {
             signInWithEmailAndPassword(auth, email, password).then((userCredentials)=>{
              navigate('/')
          }).catch((error)=>{
              setErr(error.message)
          })
  
          } catch (error) {
            setErr(errMessage)
          }
     } else {
        switch(true) {  
            case (email==null): setErr("Enter a valid email");
            break; 
            case (password==null || password.length <6): setErr("Pasword should be at least 6 characters");
            break;    
            default: setErr(errMessage);
     }
    }
}

    return (
        <div className='form-container'>
        <div className='form-wrapper'>
            <h1 className='title'>MyChatApp</h1>
            {err && <span>{err}</span>}
            <form onSubmit={handleSubmit} className='register-form' >
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <input className='submit-button' type='submit'/>
            <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
        </form>
        </div>
    </div>
    );
};

export default Login;
