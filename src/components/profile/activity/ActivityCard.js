import React, { useState } from "react";
import Time from "./UpdateTime";
import Comments from "./Comments";
import LikeButton from "./Hearted";
import { Image, Button, Popover } from "antd";
import { FaRegCommentDots } from "react-icons/fa";
import { SettingOutlined } from "@ant-design/icons";
import { deletePost } from "../../../services/post";
import { useDispatch, useSelector } from "react-redux";

function ActivityCard({
     users,
     usersName,
     date,
     avatars,
     content,
     likes,
     liked,
     image,
     comments,
     post,
}) {
     console.log(post);
     const [showComments, setShowComments] = useState(false);
     const dispatch = useDispatch();
     const { profile, loggedIn, user } = useSelector(state => state.userDuck);

     const onClickDeletePost = post => {
          if (window.confirm("Are you sure you want to delete this comment?")) {
               dispatch(deletePost(post));
          }
     };

     const tools = () => {
          return (
               <div>
                    <Button
                         size="small"
                         danger
                         onClick={() => onClickDeletePost(post)}
                    >
                         Delete Post
                    </Button>
               </div>
          );
     };

     const ToolsButton = () => {
          if (loggedIn && user.id === profile.id) {
               return (
                    <Popover content={tools} className="tools">
                         <SettingOutlined />
                    </Popover>
               );
          }
          return "";
     };

     const onCommentBtnClick = () => {
          return setShowComments(!showComments);
     };
     const CommentsLoader = () => {
          return comments?.length ? (
               <div>
                    {comments.map(comment => (
                         <Comments key={comment.id} comment={comment} />
                    ))}
               </div>
          ) : (
               ""
          );
     };

     return (
          <>
               <div className="activityCard">
                    <div className="avatarUserName">
                         <div>
                              <Image
                                   src={avatars}
                                   alt={users || usersName}
                                   className="activityAvatar"
                              />
                         </div>
                         <div className="userName">
                              <h3>{users || usersName}</h3>
                              <h6 className="date">
                                   Posted <Time date={date} />
                              </h6>
                         </div>
                    </div>

                    <div className="activityPosts">
                         <h3>{content}</h3>
                         {image ? (
                              <img src={image} className="postImage" alt="" />
                         ) : null}
                    </div>

                    <div className="likesComments">
                         <div className="likess">
                              <LikeButton post={post} liked={liked} />
                              Likes:{likes}
                         </div>
                         <div className="commentsandtool">
                              {loggedIn && user.id === profile.id ? (
                                   <div className="comments">
                                        <FaRegCommentDots
                                             className="commentBtn"
                                             onClick={onCommentBtnClick}
                                        />
                                        <h4>Comments:{comments.length}</h4>
                                   </div>
                              ) : (
                                   <div className="comments">
                                        <FaRegCommentDots className="commentBtn" />
                                        <h4>Comments:{comments.length}</h4>
                                   </div>
                              )}
                              {loggedIn && user.id === profile.id ? (
                                   <ToolsButton />
                              ) : null}
                         </div>
                    </div>
                    {showComments ? <CommentsLoader /> : null}
               </div>
          </>
     );
}
export default ActivityCard;
