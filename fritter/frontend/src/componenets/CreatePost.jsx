import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import style from './css/CreatePost.module.scss';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export const CreatePost = (props) => {

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const post={creator_id:props.user_id,content:data.get('content'),link:data.get('link')}
    console.log(post);
    /*axios.post('http://localhost:5000/post/',user).then(res=>{
      const key=Object.keys(res.data);
      if(key[0]=='message'){
        window.alert(res.data.message);
        return;
      }
      setUserDetails(res.data.user);
      setToken(res.data.token);
      navigate('/');
 })*/
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