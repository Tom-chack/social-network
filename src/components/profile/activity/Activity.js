import React, { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";
import { useSelector, useDispatch } from "react-redux";
import getPosts from "../../../services/getPosts";
import PostEditor from "../../Editor/postEditor";
function Activity() {
      const dispatch = useDispatch();
      const { posts } = useSelector((state) => state.postDuck);
      const { profile,user,loggedIn } = useSelector((state) => state.userDuck);
      const postLength = posts.length
      //load more 
      const [data, setData] = useState(posts)
      const [visible, setVisible] = useState(2)
      //
      console.log(posts)
      useEffect(() => setData(posts))
      useEffect(() => {
            if (profile.id) {
                  dispatch(getPosts("?userid=" + profile.id));
            } else {
                  console.log("no posts found");
            }
      }, [dispatch, profile]);
      const loadMoreItems = () => {
            setVisible((previtem) => previtem + 2)
      }

      return (
            <div className="activityMain">
                {((loggedIn===true)&&(profile.id===user.id))?<PostEditor/>:null }
               
                  <div >
                        {data.slice(0, visible).map(({ user, id, date, content, likes, image, comments }) =>
                              <ActivityCard classname="activityCard"
                                    users={user.name}
                                    key={id}
                                    userid={user.id}
                                    date={date}
                                    avatars={user.avatar}
                                    id={id}
                                    content={content}
                                    likes={likes}
                                    image={image}
                                    comments={comments}
                              />)}
                  </div>
                  <div className="loadMore">
                        {visible >= postLength ? null : <button onClick={loadMoreItems}>Load more</button>}
                  </div>
            </div>
      );
}
export default Activity
