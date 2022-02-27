import React, { useState } from "react";
import Time from "./UpdateTime";
import Comments from "../../Comment/Comment";
import LikeButton from "./Like";
import CommentEditor from "./commentEditor";
import { Image, Button, Popover, Card } from "antd";
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
  id,
}) {
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const { profile, loggedIn, user } = useSelector((state) => state.userDuck);

  const onClickDeletePost = (post) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      dispatch(deletePost(post));
    }
  };

  ///tool for post delete
  const toolsPost = () => {
    return (
      <div>
        <Button size='small' danger onClick={() => onClickDeletePost(post)}>
          Delete Post
        </Button>
      </div>
    );
  };

  const ToolsPostButton = () => {
    if (loggedIn && user.id === profile.id) {
      return (
        <Popover content={toolsPost}>
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
    return (
      <div>
        {loggedIn && <CommentEditor id={id} />}
        {comments.length > 0 && (
          <div className='activity-comment-list'>
            {comments.map((comment) => (
              <Comments key={comment.id} post={post} comment={comment} id={id} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card style={{ backgroundColor: "#fafafa" }}>
      <div className='avatarUserName'>
        <div>
          <Image src={avatars} alt={users || usersName} className='activityAvatar' />
        </div>
        <div className='userName'>
          <div style={{ fontSize: "16px" }}>{users || usersName}</div>
          <div style={{ fontSize: "12px", paddingTop: "9px" }} className='date'>
            Posted <Time date={date} />
          </div>
        </div>
      </div>

      <div className='activityPosts'>
        <h3>{content}</h3>
        {image ? <img src={image} className='postImage' alt='' /> : null}
      </div>

      <div className='likesComments'>
        <div className='likess'>
          <LikeButton post={post} liked={liked} /> Likes: {likes}
        </div>
        <div className='commentsandtool'>
          <div className='activity-comments'>
            <span>
              <FaRegCommentDots className='commentBtn' onClick={onCommentBtnClick} />
            </span>
            <span onClick={onCommentBtnClick}> Comments: {comments.length}</span>
            {loggedIn && user.id === profile.id ? (
              <ToolsPostButton className='activity-tools' />
            ) : null}
          </div>
        </div>
      </div>
      {showComments ? <CommentsLoader /> : null}
    </Card>
  );
}
export default ActivityCard;
