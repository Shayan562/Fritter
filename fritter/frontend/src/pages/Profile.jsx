import * as React from 'react';
import style from './css/Profile.module.scss'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { NavBar } from "../componenets/NavBar.jsx"
import { CreatePost } from '../componenets/CreatePost.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import Post from '../componenets/Post.jsx';

export default function Profile() {

  const [data,setData]=React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token=sessionStorage.getItem('token');
        const id=sessionStorage.getItem('id');
        console.log(id);
        const res = await axios.get("http://localhost:5000/post/profile"
        , {
          headers: {
            token:`${token}`,
            id:`${id}`
            // userDetails,
            // id:userDetails.user_id
          },
        }
        );
        // setData(res.data);
        // console.log(res.data);
        // if(res.data){
        //   setFlag(true);
        // }
          // console.log(res.data);
          setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Invoke the async function

    // Cleanup function (if needed)
    return () => {
      // Perform cleanup here if necessary
    };
  }, []);




  return (
    <div>
         <NavBar/>
    <Card sx={{ display: 'flex' }} className={style.card}>
        <CardMedia
        component="img"
        sx={{ width: 200 }}
        image= {data[0]?.link}
        alt="IMG"
        />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {data[0]?.username}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {data[0]?.creator_id}
          </Typography>
        </CardContent>
      </Box>
    </Card>
    {data.map((item) => {
            return (
              <Post
                name={item.username}
                date={item.created_at}
                body={item.content}
                image={item.link}
                post_id={item.post_id}
                likes={item.total_likes}
                comments={item.total_comments}
              />
            );
          })}
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