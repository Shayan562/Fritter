import { useEffect, useState } from "react";
import { CreatePost } from "../componenets/CreatePost";
import { NavBar } from "../componenets/NavBar";
import Post from "../componenets/Post";
import style from './css/PageView.module.scss'
import { useLocation } from "react-router-dom";
import axios from "axios";

export const PageView = (props) =>{
    const location=useLocation();
    const pageID=location.state.pageID;
    const [pageInfo, setPageInfo]=useState({});
    const [posts, setPosts]=useState([]);
    const [postDeleteFlag,setPostDeleteFlag]=useState('false');
      const postDeleted=()=>{
        setPostDeleteFlag(prev=>{return !prev});
      }
    // const [title,setTitle]=useState("");
    useEffect(()=>{

        // console.log(location.state.pageID);
    },[])

  const userID=props.userID;
    useEffect(() => {
    // id=sessionStorage.getItem('id')
    const fetchData = async () => {
      try {
        const token=sessionStorage.getItem('token');  
        // console.log(sessionStorage.getItem('token'));
        const res = await axios.get(`http://localhost:5000/pages/${pageID}`
        , {
          headers: {
            token:`${token}`,
            id:`${userID}`
          },
        }
        );
        // setData(res.data);
        // console.log(res.data);
        setPageInfo(res.data.pageInfo);
        setPosts(res.data.posts);
        // if(res.data){
        //   setFlag(true);
        // }
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
  },[postDeleted,setPostDeleteFlag,postDeleted] );


    return (
        <div>
            <NavBar/>
            <div className={style.heading}>
                <h1>{pageInfo.title}</h1>
            </div>
            <div className={style.newpost}>
                <CreatePost user_id={`${userID}`} page={`${pageID}`}/>
            </div>
            <div className={style.post}>
                    {posts?.map((item) => {
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
                postDeleted={postDeleted}
              />
            );
          })}
                
            </div>

        </div>
    );
}