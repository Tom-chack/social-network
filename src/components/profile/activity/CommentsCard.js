import { Image } from "antd";
import LikeHrart from "./LikeHeart";
import Comment from "./Comments";
import Time from "./UpdateTime";
function CommentsCard({user,date,avatars,content}) {
    const Avatar = () => {
        return <Image src={avatars} className='activityAvatar'  />;
        };
    
    return (
        <>
        <div className="commentCard">
    
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
                       
                 </div>
           
         </div>
   
    </div>
     </>
);
    
}
export default CommentsCard;