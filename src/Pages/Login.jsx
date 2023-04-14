import React from 'react';
import "../style.scss"

const Login = () => {
    return (
        <div className='form-container'>
        <div className='form-wrapper'>
            <h1 className='title'>MyChatApp</h1>
            <form action="" className='register-form' >
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <input className='submit-button' type='submit'/>
            <p>Don't have an account? Register</p>
        </form>
        </div>
    </div>
    );
};

export default Login;
