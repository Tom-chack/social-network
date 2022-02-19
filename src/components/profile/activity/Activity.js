import React, { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";
import { useSelector, useDispatch } from "react-redux";
import getPosts from "../../../services/getPosts";
function Activity() {
      const dispatch = useDispatch();
      const { posts } = useSelector((state) => state.postDuck);
      const { profile, loggedIn,user } = useSelector((state) => state.userDuck);
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
                  <div className="updateButton">
                        <input placeholder="Update your status..." type="text" />
                        <button >Update</button>
                  </div>
                  <div >
                        {data.slice(0, visible).map(({ user, id, date, content, likes, image, comments }) =>
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
                  <div className="loadMore">
                        {visible >= postLength ? null : <button onClick={loadMoreItems}>Load more</button>}
                  </div>
            </div>
      );
}
export default Activity
