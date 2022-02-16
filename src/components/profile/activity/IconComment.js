import {FaRegCommentDots} from 'react-icons/fa';
import { useState} from 'react';
export default function CommentIcon(){
    const [showComments, setShowComments] = useState(false);

    function onCommentBtnClick(){
           setShowComments(true)
        
    }
    return (
   <div className='comments'> 
       <FaRegCommentDots className='commentBtn' onClick={onCommentBtnClick}/> 
       <h4>Comments:1</h4>
   {showComments?"hi" :null}
    </div> 
    ) ;
}