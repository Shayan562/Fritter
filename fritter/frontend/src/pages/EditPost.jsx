import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import style from '../componenets/css/CreatePost.module.scss';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const EditPost = (props) => {
  const navigate=useNavigate();
    const location=useLocation();
    const userID=location.state.userID;
    const postID=location.state.postID;
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // event.inputRef.current.value="";
    const post={creator_id:userID,content:data.get('content'),link:data.get('link'),updateContent:false,updateImg:false};
    if(post.content.length>10){
        post.updateContent=true;
    }
    if(post.link.length>19){
        post.updateImg=true;
    } 
    console.log(post);
    axios.put(`http://localhost:5000/post/${postID}`,post,{
          headers: {
            id:`${userID}`
          },
        }).then(res=>{
        window.alert("Post Updated Successfully");
        navigate('/home');
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
     <h2 className={style.heading}>Edit Post</h2>
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