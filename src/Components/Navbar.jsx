import React from 'react';
import PropTypes from 'prop-types';


const Navbar = () => {
    return (
        <div className='navbar'>
            <h4>MyChatApp</h4>
            <div className='user'>
            <img src="" alt="" />
            <p>user</p>
            <button>Logout</button>
            </div>
        </div>
    );
};


Navbar.propTypes = {

};


export default Navbar;
