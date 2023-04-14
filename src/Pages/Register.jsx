import React from 'react';
import "../style.scss"
import ImageIcon from '@mui/icons-material/Image';

const Register = () => {
    return (
        <div className='form-container'>
            <div className='form-wrapper'>
                <h1 className='title'>MyChatApp</h1>
                <form action="" className='register-form' >
                <label htmlFor="name" >Name</label>
                <input type="text" name="name" id="name" />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <label htmlFor="file-upload" className='file-upload-label'><ImageIcon/>Upload Profile Picture
                <input type="file" name='file-upload' id='file-upload'/>
                </label> 
                <input className='submit-button' type='submit'/>
            <p>Already have an account? Login</p>

            </form>
            </div>
        </div>
    );
};



export default Register;
