import React, { useEffect, useState } from "react";
import { FaHeart} from 'react-icons/fa';
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
                   // console.log(likes)
          }
          else{
            likes=isLike-1
            setLike(likes)
            setColor("rgba(39, 38, 38, 0.39)")
            //console.log(likes)
          }
          
    }

  useEffect(()=>{
     
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