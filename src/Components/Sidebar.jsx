import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Search from './Search';


const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Navbar/>
            <Search/>
        </div>
    );
};



export default Sidebar;
