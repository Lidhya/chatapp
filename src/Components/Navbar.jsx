import React from 'react';
import user1 from "../assests/pexels-gilberto-olimpio-3686216.jpg"


const Navbar = () => {
    return (
        <div className='navbar'>
            <h4>MyChatApp</h4>
            <div className='user'>
            <img src={user1} alt="user" />
            <p>user</p>
            <button>Logout</button>
            </div>
        </div>
    );
};


export default Navbar;
