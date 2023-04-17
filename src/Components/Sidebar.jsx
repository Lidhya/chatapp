import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';


const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Navbar/>
            <Search/>
            <Chats/>
            </div>
    );
};



export default Sidebar;
