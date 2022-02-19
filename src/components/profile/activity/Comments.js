import React, { useState} from "react";
import { Image } from "antd";
import Time from "./UpdateTime";
import { TiArrowBack } from "react-icons/ti"
import {deleteComment} from "../../../services/comment"
import { useDispatch ,useSelector} from "react-redux";
function Comments({ comment }) {
    const [replyText,setReplyText]=useState()
    const { user } = comment;
    const [isClick, setClick] = useState(false);
    const dispatch=useDispatch();
    const { comments } = useSelector((state) => state.commentDuck);
    const replyBtnClick=(()=>console.log(replyText))
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
                <input type="text" value={replyText} placeholder="Write a reply" onInput={e=>setReplyText(e.target.value)} />
                 <button onClick={replyBtnClick}>Reply</button>
            </div>
          
        );
      };
      ///delete comment
     const deleteComments=(comment)=>{
         if(window.confirm("Are you sure you want to delete this comment?")){
         dispatch(deleteComment(comment)) 
        
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
               <div><span><TiArrowBack onClick={onReply}/>Reply</span> |</div> 
                <div><span onClick={()=>deleteComments(comment)}>Delete</span></div>
          </div>
          {isClick?<FileUploader/>:null}
        </div>
    
  );
}

export default Comments;
