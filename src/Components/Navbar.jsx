import React, { useContext } from 'react';
import user1 from "../assests/pexels-gilberto-olimpio-3686216.jpg"
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../Context/AuthContext';


const Navbar = () => {
    const { currentUser}=useContext(AuthContext)
    const handleLogout= () => signOut(auth) 
    return (
        <div className='navbar'>
            <h4>MyChatApp</h4>
            <div className='user'>
            <img src={currentUser.photoURL} alt="user" />
            <p>{currentUser.displayName}</p>
            <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};


export default Navbar;
