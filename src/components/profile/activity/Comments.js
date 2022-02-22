/* eslint-disable react/prop-types */
import React, {  useState} from "react";
import { useDispatch ,useSelector} from "react-redux";
import {deleteComment} from "../../../services/comment"
import CommentEditor from "./commentEditor";
import Time from "./UpdateTime";
import { Image } from "antd";
import { TiArrowBack } from "react-icons/ti"
import { Link } from 'react-router-dom';

function Comments({ comment,id }) {
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
                  <Image
                        className='commentsAvatarReply' 
                        src={user.avatar} 
                        alt={user.name || user.username} />
                                      
                     <CommentEditor id={id}/>        
            </div>
          
        );
      };
  
  return (
       <div className='commentContainer'>
            <div  className="commentsHeaderPart">
                 <div>
                     
                     <Link to={`/profile/${user.id}`}>
                                    <Image
                                       className='commentsAvatar' 
                                       src={user.avatar} 
                                       alt={user.name || user.username}
                                     />
                     </Link>
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
           
              <div><span><TiArrowBack onClick={onReply}/>Reply</span> |</div> 
              {(profile.id===user.id)?  <div><span onClick={()=>deleteComments(comment)}>Delete</span></div>:null}
            
              
          </div>
          <div> {isClick?<FileUploader/>:null} </div>
        </div>
    
  );
}

export default Comments;
