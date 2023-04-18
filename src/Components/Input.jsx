import React from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';

const Input = () => {
    return (
        <div className='input'>
            <input type="text" placeholder='Type something...' />
            <div>
                <AttachFileRoundedIcon/>
                <ImageRoundedIcon/>
                <SendRoundedIcon/>
            </div>
        </div>
    );
};



export default Input;
