import {FaRegArrowAltCircleDown, FaRegCommentDots} from 'react-icons/fa';
import { useState,useEffect } from 'react';
import CommemtsCard from './CommentsCard';
import { useSelector,useDispatch } from "react-redux";
import getPosts from "../../../services/getPosts";
export default function Comment(){
    const dispatch=useDispatch();
    const { posts } = useSelector((state) => state.postDuck);  
    const [showComments, setShowComments] = useState(false);
    console.log(posts)
      useEffect(() => {
          dispatch(getPosts());
        
      }, [dispatch]);
     
      const post=posts.map((item,index)=>{
        let comment=item.comments
        const arrOfComments=[]
        for(let i=0;i<comment.length;i++){
            arrOfComments.push(comment[i].map(item=>item.content)) 
         }
         console.log("zangvaccc",arrOfComments)
           return arrOfComments
        })


    function onCommentBtnClick(){
           setShowComments(true)
        
    }
    return (
   <div className='comment'> 
       <FaRegCommentDots className='commentBtn' onClick={onCommentBtnClick}/> 
       <h4>Comments:{post}</h4>
   {showComments?"hi" :null}
    </div> 
    ) ;
}