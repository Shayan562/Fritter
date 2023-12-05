import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import style from './css/CreatePost.module.scss';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const CreatePost = (props) => {
  const navigate=useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // event.inputRef.current.value="";

    const post={creator_id:props.user_id,content:data.get('content'),link:data.get('link')}
    console.log(post);
    axios.post('http://localhost:5000/post/',post).then(res=>{
        window.alert("Post Created Successfully");
 })
  };

    return (  
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    onSubmit={handleSubmit}
    noValidate
    autoComplete="off"
    className={style.newpost}>
    <div> 
     <h2 className={style.heading}>Create New Post</h2>
    <TextField
        required
        id="content"
        label="Post Body"
        name='content'
        multiline
        rows={2}
        variant="filled"
        />
      <TextField
        id="link"
        name='link'
        label="Image Link"
        placeholder="Enter Link"
        multiline
        rows={2}
        variant="filled"
        />
    </div>
    <Button variant="outlined" type='submit'>Post</Button>
  </Box>
);

}