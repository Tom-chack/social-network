import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { FaHeart} from 'react-icons/fa';
import { updatePost } from "../../../services/post";
export default function LikeHeart({likes}) {
  //console.log(likes)
  const [isClick, setClick] = useState(false);
  const [isLike, setLike] = useState(likes);
  const [color,setColor]=useState("rgba(39, 38, 38, 0.39)")
  const onHandleClick=()=> {  
          setClick(!isClick)
          if(!isClick){
                    likes=isLike+1
                    setLike(likes)
                    setColor("red")
                    console.log(likes)
                    updatePost(isLike)
                    console.log(likes)
          }
          else{
            likes=isLike-1
            setLike(likes)
            setColor("rgba(39, 38, 38, 0.39)")
            console.log(likes)
            updatePost(isLike)
          }
          
    }
//
  useEffect(()=>{
     setLike(likes)
  },[likes])
  
  return (
<>
    <div className="likeHeart">
    <FaHeart style={{
                     color: color, 
                     fontSize: '20px',
                     cursor:"pointer"
                    }}
                    onClick= {onHandleClick} /> 
                     <h4>Likes: {isLike}</h4>
     </div>
     </>
  );
  
}