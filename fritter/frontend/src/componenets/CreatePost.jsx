import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import style from './css/CreatePost.module.scss';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export const CreatePost = () => {
    return (  
    <Box
    component="form"
    sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
    className={style.newpost}>
    <div> 
     <h2 className={style.heading}>Create New Post</h2>
    <TextField
        id="filled-multiline-static"
        label="Post Body"
        multiline
        rows={2}
        variant="filled"
        />
      <TextField
        id="filled-textarea"
        label="Image Link"
        placeholder="Enter Link"
        multiline
        rows={2}
        variant="filled"
        />
    </div>
    <Button variant="outlined">Post</Button>
  </Box>
);

}