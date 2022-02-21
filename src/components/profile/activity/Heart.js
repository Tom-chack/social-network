import { useDispatch, useSelector } from "react-redux";
import { likePost, dislikePost } from "../../services/like";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";

function Post({ post }) {
  const {  liked} = post;

  const dispatch = useDispatch();
  const { user: currentUser, loggedIn } = useSelector((state) => state.userDuck);

  const handleLike = (e) => {
    dispatch(likePost(post));
    e.target.style.fill = "#ff0000";
  };
  const handleDislike = (e) => {
    dispatch(dislikePost(post));
    e.target.style.fill = "#ffffff";
  };

  const LikeButton = () => {
    if (loggedIn) {
      if (!liked.length || !liked.includes(currentUser.id)) {
        return <HeartOutlined className='post-like-icon' onClick={(e) => handleLike(e)} />;
      } else {
        return (
          <HeartTwoTone
            className='post-like-icon'
            onClick={(e) => handleDislike(e)}
            twoToneColor='#ff0000'
          />
        );
      }
    }
    return <HeartOutlined className='post-like-icon' />;
  };

 