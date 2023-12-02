import { NavBar } from "../componenets/NavBar.jsx";
import Post from "../componenets/Post.jsx";
import style from "./css/Home.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {
  const [data, setData] = useState([{ name: "", date: "", body: "" }]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/post/feed", {
          headers: {
            id: "user5",
          },
        });
        setData(res.data);
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

  return (
    <div>
      <NavBar />
      <div className={style.grid}>
        <div className={style.post}>
          {data.map((item) => {
            return (
              <Post
                name={item.creator_id}
                date={item.created_at}
                body={item.content}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
