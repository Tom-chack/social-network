import { Image } from "antd";
import LikeHeart from "./LikeHeart";
import Time from "./UpdateTime";
import Comments from "./Comments"
import {useState} from "react"
import { FaRegCommentDots} from "react-icons/fa"
function ActivityCard({user,date,avatars,content,likes,image,comments}) {
    const [showComments, setShowComments] = useState(false);
   
    const onCommentBtnClick=()=>{
      return     setShowComments(!showComments)
        
    }
    const CommentsLoader=()=>{
      return   (comments?.length ? (
            <div>
            {comments.map((comment) => (
            <Comments key={comment.id} comment={comment} />))}
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
                                 {user}
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
                    
                             <LikeHeart likes={likes} /> 
                             <div className='comments'> 
                             <FaRegCommentDots className='commentBtn' onClick={onCommentBtnClick}/> 
                              <h4>Comments:{comments.length}</h4>
    </div> 
                             
                 </div>
               {showComments?<CommentsLoader/>:null}      
         </div>      
    </>
);
    
}
export default ActivityCard;