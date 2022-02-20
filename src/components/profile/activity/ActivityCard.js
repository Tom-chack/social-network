import { Image } from "antd";
import LikeHeart from "./LikeHeart";
import Time from "./UpdateTime";
import Comments from "./Comments"
import {Profiler, useState} from "react"
import { FaRegCommentDots} from "react-icons/fa"
import { deletePost } from "../../../services/post";
import { useDispatch ,useSelector} from "react-redux";
function ActivityCard({users,date,avatars,content,likes,liked,image,comments,id}) {
    const [showComments, setShowComments] = useState(false);
    const dispatch=useDispatch();
    const { posts} = useSelector((state) => state.postDuck); 
    const {profile,user}=useSelector((state)=>state.userDuck)
   console.log("delete post",id)
    const onClickDeletePost=(id)=>{
        if(window.confirm("Are you sure you want to delete this comment?")){
            dispatch(deletePost(id)) 
           
        }
}
    const onCommentBtnClick=()=>{
      return     setShowComments(!showComments)
        
    }
    const CommentsLoader=()=>{
      return   (comments?.length ? (
            <div>
            {comments.map((comment) => (
            <Comments key={comment.id} comment={comment}  id={id}/>))}
           </div> ) : (''));
    }

    const Avatar = () => {
    return <Image src={avatars} className='activityAvatar'  />;
    };
    return (
        <>
         <div className="activityCard">
                 <div className="avatarUserName">
                         <div>
                             <Avatar/>
                             
                         </div>
                         <div className="userName">
                             <h3> 
                                 {users}
                             </h3>
                             <h6 className="date">
                                 Posted <Time date={date}/>
                             </h6>
                         </div>     
                 </div>
           
                 <div className="activityPosts">
                         <h3>{content}</h3>
                         {image?<img src={image} className="postImage"/>:""}
                 </div>
           
                 <div className="likesComments">
                    
                             <LikeHeart post={posts} likes={likes} /> 
                             <div className='comments'> 
                             <FaRegCommentDots className='commentBtn' onClick={onCommentBtnClick}/> 
                              <h4>Comments:{comments.length}</h4>
                            </div> 
                            <div>
                              {(user.id===profile.id) ? <button onClick={()=>onClickDeletePost(id)}>Delet post</button>:null}
                            </div>
                             
                 </div>
               {showComments?<CommentsLoader/>:null}      
         </div>      
    </>
);
    
}
export default ActivityCard;