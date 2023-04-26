import React from 'react';
import user1 from "../assests/pexels-gilberto-olimpio-3686216.jpg"
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';


const Navbar = () => {
    const handleLogout= () => signOut(auth) 
    return (
        <div className='navbar'>
            <h4>MyChatApp</h4>
            <div className='user'>
            <img src={user1} alt="user" />
            <p>user</p>
            <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};


export default Navbar;
