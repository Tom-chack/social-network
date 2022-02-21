import Item from "antd/lib/list/Item";
import React, { useEffect, useState } from "react";
import { FaHeart} from 'react-icons/fa';
import {likePost} from "../../../services/like"
import {dislikePost}  from "../../../services/like";
import { useDispatch,useSelector } from "react-redux";
export default function LikeHeart({post,likes}) {

  const dispatch = useDispatch();
const { user: currentUser, loggedIn } = useSelector((state) => state.userDuck);

 // const { likes, liked } = post;
  const [isClick, setClick] = useState(false);
 // const [isLike, setLike] = useState(likes);
  const [color,setColor]=useState("rgba(39, 38, 38, 0.39)")
  const onHandleClick=()=> {  
        
          setClick(!isClick)
          if(!isClick){
            dispatch(likePost(post));
                    setColor("red")
          }
          else{
            dispatch(dislikePost(post));
            setColor("rgba(39, 38, 38, 0.39)")
         
          }
          
    }

  
  return (
<>
    <div className="likeHeart">
    <FaHeart style={{
                     color: color, 
                     fontSize: '20px',
                     cursor:"pointer"
                    }}
                    onClick= {onHandleClick} /> 
                     <h4>Likes: {likes}</h4>
     </div>
     </>
  );
  
}