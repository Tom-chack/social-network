/* eslint-disable react/prop-types */
import React, {  useState} from "react";
import { Image } from "antd";
import Time from "./UpdateTime";
import { TiArrowBack } from "react-icons/ti"
import {deleteComment} from "../../../services/comment"
import { useDispatch ,useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import CommentEditor from "./commentEditor";
function Comments({ comment,id }) {
  console.log("postid from activitycard",id)
    const { user } = comment;
    const [isClick, setClick] = useState(false);
    const dispatch=useDispatch();
   const {profile}=useSelector((state)=>state.userDuck)
        ///delete comment
        const deleteComments=(comment)=>{
          if(window.confirm("Are you sure you want to delete this comment?")){
          dispatch(deleteComment(comment)) 
         
          }
      }
         const onReply=()=>{
          
         return  setClick(!isClick)
 
         }
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
                     <CommentEditor id={id}/>        
            </div>
          
        );
      };
  
  return (
       <div className='commentContainer'>
            <div  className="commentsHeaderPart">
                 <div>
                     
                     <Link to={`/profile/${user.id}`}> {user?.avatar ? <Image
                                       className='commentsAvatar' 
                                       src={user.avatar} 
                                       alt={user.name || user.username} />
                                       :
                                      <Image 
                                      className="commentsAvatar" 
                                      src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"/>
                                     } </Link>
                 </div> 
                 <div className="commentsDataPart">
                    <Link to={`/profile/${user.id}`}><h4>{user.name}</h4> </Link> 
                      <h6 className="date">
                      Posted <Time date={comment.date}/>
                      </h6> 
                      <div >{comment.content}</div>  

                 </div>
              </div>
             
         <div className="commentsFooterBtn">
           
              {(profile.id!==user.id)?<div><span><TiArrowBack onClick={onReply}/>Reply</span> |</div> :null} 
                <div><span onClick={()=>deleteComments(comment)}>Delete</span></div>
            
              
          </div>
          <div> {isClick?<FileUploader/>:null} </div>
        </div>
    
  );
}

export default Comments;
