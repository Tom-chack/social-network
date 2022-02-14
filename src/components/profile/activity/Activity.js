import React, { useEffect } from "react";
import ActivityCard from "./ActivityCard";
import { useSelector,useDispatch } from "react-redux";
import getPosts from "../../../services/getPosts";
function Activity() {
  const dispatch=useDispatch();
  const { posts } = useSelector((state) => state.postDuck);
  console.log(posts)
  useEffect(()=>{
      dispatch(getPosts());
  
  },[dispatch])
  return (
    <div  className="activityMain">
           <div className="updateButton">
                  <input placeholder="Update your status..." type="text"></input>
                  <button>Update</button>
            </div>
            <div >
                 {posts.map(({id,date,image,content,likes})=>
                       <ActivityCard classname="activityCard"
      
                        key={id} 
                        date={date} 
                        image={image} 
                        id={id} 
                        content={content} 
                        likes={likes}
                  />)}
            </div>
  </div>
  );
}
export default Activity
