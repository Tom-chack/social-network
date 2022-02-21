import { Image } from "antd";
import Time from "./UpdateTime";
import Comments from "./Comments"
import { FaRegCommentDots} from "react-icons/fa"
import { deletePost } from "../../../services/post";
import { useDispatch ,useSelector} from "react-redux";
import React, { useState } from "react";
import LikeButton from "./Hearted";
function ActivityCard({users,date,avatars,content,likes,liked,image,comments,id,post}) {
    const [showComments, setShowComments] = useState(false);
    const dispatch=useDispatch();
    const { posts} = useSelector((state) => state.postDuck); 
    const {profile,loggedIn,user}=useSelector((state)=>state.userDuck)
    const onClickDeletePost=(post)=>{
        if(window.confirm("Are you sure you want to delete this comment?")){
            dispatch(deletePost(post)) 
        
        }
}
    const onCommentBtnClick=()=>{
      return    setShowComments(!showComments)
        
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
                           <div><LikeButton  post={post} liked={liked}/>Likes:{likes}</div>
                         {(loggedIn && user.id===profile.id) ?  
                             <div className='comments'> 
                             <FaRegCommentDots className='commentBtn' onClick={onCommentBtnClick}/> 
                              <h4>Comments:{comments.length}</h4>
                            </div>
                            :
                            <div className='comments'> 
                             <FaRegCommentDots className='commentBtn'/> 
                              <h4>Comments:{comments.length}</h4>
                            </div>
                        } 
                            <div>
                              {(loggedIn && user.id===profile.id) ? <button onClick={()=>onClickDeletePost(post)}>Delet post</button>:null}
                            </div>
                             
                 </div>
               {showComments?<CommentsLoader/>:null}      
         </div>      
    </>
);
    
}
export default ActivityCard;