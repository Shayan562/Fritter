import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import AddCommentIcon from '@mui/icons-material/AddComment';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import style from './css/Post.module.scss'
import { Comment } from './Comment';
import { useState,useEffect } from 'react';
import axios from 'axios';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [renderComments, setRenderComments] = React.useState(false);
  // console.log(props);
  const postID=props.post_id;
  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [commentData, setCommentData]=useState("");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token=sessionStorage.getItem('token');
            const id=sessionStorage.getItem('id');
            console.log(`Comments of ${postID}`);
            const res = await axios.get(`http://localhost:5000/comments/${postID}`
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
              console.log(res.data);
              setCommentData(res.data);
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
    <Card className={style.card}>
      {/* <Comment post_id={postID}/> */}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.name}
        subheader={props.date}
      />
      {(props.image!='' && props.image!=null?<CardMedia
        component="img"
        height="194"
        image={props.image}
      />:'No Image')
      }
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Like">
          <FavoriteIcon />
          {props.likes}
        </IconButton>
        <IconButton aria-label="Comment">
          <AddCommentIcon onClick={()=>{
            // setRenderComments(prev=>{return !prev});
            handleExpandClick();
            // console.log("Toggle Comments:"+postID);
          }}/>
          {props.comments}
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {/* <ExpandMoreIcon /> */}
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        </CardContent>
      </Collapse>
      <Typography>
        {commentData[0]?.body}
        </Typography>
      {/* {renderComments} */}
    </Card>
  );
}
