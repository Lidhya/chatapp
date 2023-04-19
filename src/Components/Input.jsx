import React from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';

const Input = () => {
    return (
        <div className='input'>
            <input type="text" placeholder='Type something...' />
            <div className='icons'>
                <div className='attach-image-icon'>
                <AttachFileRoundedIcon/>
                <ImageRoundedIcon/>
                </div>
                <button><SendRoundedIcon className='sendIcon'/></button>
            </div>
        </div>
    );
};



export default Input;
