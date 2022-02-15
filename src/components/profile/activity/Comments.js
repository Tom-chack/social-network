import {FaRegCommentDots} from 'react-icons/fa';
import { useState,useEffect } from 'react';
import CommemtsCard from './CommentsCard';
import { useSelector,useDispatch } from "react-redux";
import getPosts from "../../../services/getPosts";
export default function Comment(){
    const dispatch=useDispatch();
    const { posts } = useSelector((state) => state.postDuck); 
    console.log(posts)
      useEffect(() => {
          dispatch(getPosts());
        
      }, [dispatch]);
      const comments=posts.map((item)=>item.comments.id)
      console.log("here ",comments)
    const [flag, setFlage] = useState(false);

    function messages(){
           setFlage(true)
        
    }
    return (
   <div className='comment'> 
       <FaRegCommentDots className='commentBtn' onClick={messages}/> 
       <h4>Comments:{comments.id}</h4>
   {flag?<div><CommemtsCard/></div> :null}
    </div> 
    ) ;
}