import { useEffect, useState } from "react";
import axios from "axios"
export const Comment=(props)=>{
    const postID=props.post_id;
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
              // console.log(res.data);
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

    return <>{commentData[0]?.content}</>
}