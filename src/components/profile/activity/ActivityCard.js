import { Image } from "antd";
import LikeHrart from "./LikeHeart";
import Comment from "./Comments";
import Time from "./UpdateTime";
function ActivityCard({date,image,id,content,likes}) {
    const Avatar = () => {
    return <Image src={image} className='activityAvatar'  />;
    
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
                                 UserName{id}
                             </h3>
                             <h6 className="date">
                                 Posted an update <Time date={date}/>
                             </h6>
                         </div>     
                 </div>
           
                 <div className="activityPosts">
                         <h3>{content}</h3>
                 </div>
           
                 <div className="likesComments">
                    
                             <LikeHrart likes={likes}/> 
                         
                             <Comment/>
                             
                         
                 </div>
           
         </div>
    </>
);
    
}
export default ActivityCard;