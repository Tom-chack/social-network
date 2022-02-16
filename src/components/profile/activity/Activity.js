import React, { useEffect } from "react";
import ActivityCard from "./ActivityCard";
import { useSelector,useDispatch } from "react-redux";
import getPosts from "../../../services/getPosts";
function Activity() {
  const dispatch=useDispatch();
  const { posts } = useSelector((state) => state.postDuck);
  const { profile } = useSelector((state) => state.userDuck); 
  console.log(posts)
  useEffect(() => {
      if (profile.id) {
        dispatch(getPosts("?userid=" + profile.id, true));
      } else {
        console.log("no posts found");
      }
    }, [dispatch, profile]);
  return (
    <div  className="activityMain">
           <div className="updateButton">
                  <input placeholder="Update your status..." type="text"/>
                  <button>Update</button>
            </div>
            <div >
                 {posts.map(({user,id,date,content,likes,image,comments})=>
                       <ActivityCard classname="activityCard"
                        user={user.name}
                        key={id} 
                        date={date} 
                        avatars={user.avatar} 
                        id={id} 
                        content={content} 
                        likes={likes}
                        image={image}
                        comments={comments}
                  />)}
            </div>
  </div>
  );
}
export default Activity
