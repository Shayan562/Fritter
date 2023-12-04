import { NavBar } from "../componenets/NavBar.jsx"
import style from './css/Message.module.scss'
import ForumIcon from '@mui/icons-material/Forum';
import SendIcon from '@mui/icons-material/Send';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const Message = () => {
    return (
        <div>
        <NavBar/>
        <div className={style.heading}>
           <div>
            <ForumIcon/>  <h3> DM</h3>
            </div> 
        </div>
        <div className={style.user1}>
            UserName 1
            <div>
                    Message 1 here   time stamp
            </div>
        </div>

        <div className={style.user2}>
            UserName 2
            <div>
                    Message 2 here time stamp
            </div>
        </div>
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <div>
        <TextField
          label="Size"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
        />
        </div>
        </Box>
        <SendIcon/>
        </div>

    );
}