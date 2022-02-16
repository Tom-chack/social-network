import { Image } from "antd";
import LikeHeart from "./LikeHeart";
import Time from "./UpdateTime";
import Comments from "./Comments"
import CommentIcon from "./IconComment";
function ActivityCard({user,date,avatars,content,likes,image,comments}) {
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
                         <img src={image} className="postImage"/>
                 </div>
           
                 <div className="likesComments">
                    
                             <LikeHeart likes={likes}/> 
                             <CommentIcon/>
                          
                 </div>
                 
                  {comments?.length ? (
                              <div>
                              {comments.map((comment) => (
                              <Comments key={comment.id} comment={comment} />))}
                             </div> ) : ('')}
                 
         </div>
       
    </>
);
    
}
export default ActivityCard;