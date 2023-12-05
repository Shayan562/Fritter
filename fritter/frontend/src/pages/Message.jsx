import { NavBar } from "../componenets/NavBar.jsx"
// import style from './css/Message.module.scss'
import ForumIcon from '@mui/icons-material/Forum';
import SendIcon from '@mui/icons-material/Send';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { MessageText } from "../componenets/MessageText.jsx";
import style from '../componenets/css/message.module.scss'
import { IconButton } from "@mui/material";
// import { Receiver } from "../componenets/messages/Receiver.jsx";

export const Message = (props) => {
  const location=useLocation();
  const friendID=location.state.friendID;
  const userID=location.state.userID;
  const [messages,setMessages]=React.useState([]);
  
  const handleMessageSending=(event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  // event.inputRef.current.value="";
  
  const message={sender_id:userID,receiver_id:friendID,content:data.get('message')}
  // console.log(message);
  axios.post('http://localhost:5000/message/',message).then(res=>{
      // window.alert("Post Created Successfully");
  })
  };

    React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token=sessionStorage.getItem('token');
        const id=sessionStorage.getItem('id');
        const res = await axios.get(`http://localhost:5000/message/${friendID}`
        , {
          headers: {
            token:`${token}`,
            id:`${userID}`,
          },
        }
        );
          setMessages(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


    fetchData(); // Invoke the async function
    // Cleanup function (if needed)
    return () => {
    };
  }, [handleMessageSending]);

    return (
        <div>
        <NavBar/>
        <div>
           <div>
            <ForumIcon/>  <h3> DM</h3>
            </div> 
        </div>
        {messages?.map(message=>{
          const sender_id=message.sender_id;
          const content=message.content;
          const sent_date=message.sent_date;
          if(sender_id===userID){
            return <MessageText style={style.sender} sender_id={sender_id} content={content} sent_date={sent_date} />
          }
          else{
            return <MessageText style={style.receiver} sender_id={sender_id} content={content} sent_date={sent_date} />
          }
        })}
        <Box
      component="form"
      noValidate
      onSubmit={handleMessageSending}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      autoComplete="off"
    >
        <div>
        <TextField
          label="Message"
          id="message"
          name="message"
          defaultValue=""
          size="large"
        />
        </div>
        <IconButton type="submit"> <SendIcon/></IconButton>
        </Box>
        
        </div>

    );
}