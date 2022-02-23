import React, {  useState,useCallback } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { deleteComment } from "../../../services/comment"
import CommentEditor from "./commentEditor";
import Time from "./UpdateTime";
import { Image,Popover,Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
function Comments({ comment,id }) {
    const { user } = comment;
    const [reply, setReply] = useState(false);

    const dispatch=useDispatch();
    const {profile,loggedIn}=useSelector((state)=>state.userDuck)
  
      //delete or edit comments
      const tools = () => {
        return (
          <div>
            <Button type='primary' size='small' ghost onClick={() => setReply(true)}>
              Reply
            </Button>
            <Button
              danger
              size='small'
              onClick={() =>
                window.confirm("Are you sure you want to delete this comment?") &&
                dispatch(deleteComment(comment))
              }
            >
              Delete
            </Button>
          </div>
        );
      };
    
      const ToolsCommentButton = () => {
        if (loggedIn ) {
          return (
            <Popover content={tools}>
              <SettingOutlined />
            </Popover>
          );
        }
        return "";
      };
    
      const handleCancel = useCallback(() => {
        setReply(false);
      }, []);
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
                    <Link to={`/profile/${user.id}`}><h4>{user.name || user.username}</h4> </Link> 
                      <h6 className="date">
                      Posted <Time date={comment.date}/>
                      </h6> 
                      <div >{comment.content}</div>  

                 </div>
                 
              </div>
                           
         <div className="commentsFooterBtn">
           
           <ToolsCommentButton/>
      
           
       </div>
         
         {reply && (
            <div  className="toolcomment">
              <div> <Link to={`/profile/${user.id}`}>
                                    <Image
                                       className='commentsAvatar' 
                                       src={user.avatar} 
                                       alt={user.name || user.username}
                                     />
                     </Link>
                    <CommentEditor  id={id} cancel={handleCancel} />
              </div>
            </div>
          )}     
             
           </div>
          
    
      )        
            
}

export default Comments;
