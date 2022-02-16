import React from "react";
import { Image } from "antd";
import Time from "./UpdateTime";
import LikeHeart from "./LikeHeart";
function Comments({ comment }) {
    const { user } = comment;
    //console.log("new",comment,user.avatar)
  return (
       <div className='commentContainer'>
            <div  className="commentsHeaderPart">
                 <div>
                     
                      {user?.avatar && <Image
                                       className='commentsAvatar' 
                                       src={user.avatar} 
                                       alt={user.name || user.username} />
                                       ||
                                      <Image 
                                      className="commentsAvatar" 
                                      src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"/>}
                 </div> 
                 <div className="commentsDataPart">
                     <h4>{user.name}</h4> 
                      <h6 className="date">
                      Posted <Time date={comment.date}/>
                      </h6> 
                      <div >{comment.content}</div>  

                 </div>
              </div>
             
         <div className="commentsFooterBtn">
            <LikeHeart likes={comment.likes}/>
            <div className="commentsthreeBtn">
               <div><span>Reply</span> |</div> 
                <div><span>Report</span> |</div> 
                <div><span>Delete</span></div>
            </div> 
          </div>
        </div>
    
  );
}

export default Comments;
