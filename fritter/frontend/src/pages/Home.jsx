import { NavBar } from "../componenets/NavBar.jsx";
import Post from "../componenets/Post.jsx";
import style from "./css/Home.module.scss";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CreatePost } from "../componenets/CreatePost.jsx";
import { AppContext } from "../App.js";
import { useNavigate } from "react-router-dom";

export const Home = (props) => {
  const [data, setData] = useState([]);
  const [flag, setFlag]=useState(false);
  const userID=props.userID;
  const navigate=useNavigate();
  // const {userDetails, setUserDetails, token, setToken} = useContext(AppContext);
  // const getData = async () =>{
  //     axios.get("http://localhost:5000/post/feed").then((res)=>{
  //   setData(res.data[2])
  // //   console.log(data);
  //   console.log(res.data[0]);
  // }
  // }

  //   useEffect(async ()=>{
  //     await axios.get("http://localhost:5000/post/feed").then((res)=>{
  //       setData(res.data[2])
  //     //   console.log(data);
  //       console.log(res.data[0]);
  //     },[])
  //   })

  let id;

    // useEffect(()=>{id=sessionStorage.getItem('id');console.log("Props"+props.userID)},[]);

  useEffect(() => {
    id=sessionStorage.getItem('id')
    const fetchData = async () => {
      try {
        const token=sessionStorage.getItem('token');  
        console.log(sessionStorage.getItem('token'));
        const res = await axios.get("http://localhost:5000/post/feed"
        , {
          headers: {
            token:`${token}`,
            id:`${id}`
          },
        }
        );
        setData(res.data);
        console.log(res.data);
        if(res.data){
          setFlag(true);
        }
        //   console.log(res.dat/a[0]);
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

  // console.log("ID"+id);
  // const userid=sessionStorage.id;
  return (
    <div className={style.bg}>
      <NavBar />
      <CreatePost user_id={`${userID}`} page={null}/>
        <div className={style.post}>
          {data.map((item) => {
            return (
              <Post
                user_id={userID}
                creator_id={item.creator_id}
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
      </div>
  );
};
