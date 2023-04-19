import React from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';

const Input = () => {
    return (
        <div className='input'>
            <input type="text" placeholder='Type something...' />
            <div className='icons'>
                <div>
                <AttachFileRoundedIcon/>
                <ImageRoundedIcon/>
                </div>
                <div className='sendBtn'>
                <SendRoundedIcon className='sendIcon'/>
                </div>
            </div>
        </div>
    );
};



export default Input;
