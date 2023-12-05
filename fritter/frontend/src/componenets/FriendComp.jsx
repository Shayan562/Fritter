import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavBar } from "../componenets/NavBar.jsx"
import axios from 'axios'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';



export const Friend=(props)=>{

  const navigate=useNavigate();
  const removeFriend = async (friend_id) => {
    try {
        const token=sessionStorage.getItem('token');
        // const id=sessionStorage.getItem('id');
        const res = await axios.delete(`http://localhost:5000/friends/${friend_id}`
        , {
          headers: {
            token:`${token}`,
            id:`${props.user_id}`,
          },
        }
        );
        // setFriendsData(res.data);
        // console.log(res.data);
        // console.log(res.data);
        // if(res.data){
        //   setFlag(true);
        // }
        // console.log(res.data);
        // setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const handleRemoveFriend=()=>{
        removeFriend(props.friend_id);
        props.updateFriendList();
    } 
    const redirectToPage = () => {
      navigate("/message", {
            state: {
                userID: `${props.user_id}`,
                friendID: `${props.friend_id}`
            },
        });
      }


    return (
    <Grid item key={props.friend_id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {props.username}
                    </Typography>
                    <Typography>
                      {props.friend_id}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="Large" onClick={redirectToPage}>Message</Button>
                    <IconButton>
                    <PersonRemoveIcon onClick={handleRemoveFriend}/>
                    </IconButton>
                    {/* <NotificationsNoneIcon/> */}
                  </CardActions>
                </Card>
              </Grid>
        );
}