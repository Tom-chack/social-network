import React, { useState} from "react";
import { Image } from "antd";
import Time from "./UpdateTime";
import { TiArrowBack } from "react-icons/ti"
import LikeHeart from "./LikeHeart";
import {deletePost} from "../../../services/post"
function Comments({ comment }) {
    const { user } = comment;
    //console.log("new",comment,user.avatar).
    const [isClick, setClick] = useState(false);
    const FileUploader = () => {
        return (
          
           <div className="fileUploader">
                 {user?.avatar? <Image
                                       className='commentsAvatarReply' 
                                       src={user.avatar} 
                                       alt={user.name || user.username} />
                                       :
                                      <Image 
                                      className="commentsAvatarReply" 
                                      src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"/>}
                <input type="text" placeholder="Write a reply"/>
                 <button>Reply</button>
            </div>
          
        );
      };
      ///delete comment
     const deleteComment=()=>{
         if(window.confirm("Are you sure you want to delete this comment?")){
          deletePost(user.id)
            console.log("delete id===",user.id)
         }
     }
        const onReply=()=>{
        return    setClick(!isClick)

        }
  return (
       <div className='commentContainer'>
            <div  className="commentsHeaderPart">
                 <div>
                     
                      {user?.avatar ? <Image
                                       className='commentsAvatar' 
                                       src={user.avatar} 
                                       alt={user.name || user.username} />
                                       :
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
               <div><span><TiArrowBack onClick={onReply}/>Reply</span> |</div> 
                <div><span onClick={deleteComment}>Delete</span></div>
            </div> 
          </div>
          {isClick?<FileUploader/>:null}
        </div>
    
  );
}

export default Comments;
