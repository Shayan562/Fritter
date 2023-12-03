import * as React from 'react';
import style from './css/Profile.module.scss'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { NavBar } from "../componenets/NavBar.jsx"
import { CreatePost } from '../componenets/CreatePost.jsx';

export default function Profile() {

  return (
    <div>
         <NavBar/>
    <Card sx={{ display: 'flex' }} className={style.card}>
        <CardMedia
        component="img"
        sx={{ width: 200 }}
        image= "rehan_pic.jpg"
        alt="Muhammad Rehan Khan"
        />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Muhammad Rehan Khan
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            LunaTIC
          </Typography>
        </CardContent>
      </Box>
    </Card>
    <CreatePost/>
    </div>
  );
}



// export const Profile = () =>{
//     return(
//         <div>
//        
//         <div className={style.grid}>
//             <div className={style.post}>
//                 Profile Page 
//             </div>
//         </div>
     
//         </div>
//     );

// }