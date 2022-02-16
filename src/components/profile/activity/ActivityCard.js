import { Image } from "antd";
import LikeHrart from "./LikeHeart";
import Comment from "./Comments";
import Time from "./UpdateTime";
import CommentsCard from "./CommentsCard";
function ActivityCard({user,date,avatars,content,likes,image}) {
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
                                 Posted an update <Time date={date}/>
                             </h6>
                         </div>     
                 </div>
           
                 <div className="activityPosts">
                         <h3>{content}</h3>
                         <img src={image} className="postImage"/>
                 </div>
           
                 <div className="likesComments">
                    
                             <LikeHrart likes={likes}/> 
                         
                             <Comment/>
                    
                 </div>
                 <CommentsCard user={user}
                              date={date} 
                             avatars={avatars}
                              content={content} 
                             />
         </div>
    </>
);
    
}
export default ActivityCard;