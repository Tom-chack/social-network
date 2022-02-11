import React, { useState } from "react";
import Heart from "react-animated-heart";
export default function LikeHrart({likes}) {
  //console.log(likes)
  const [isClick, setClick] = useState(false);
  const [isLike, setLike] = useState(likes);
  return (
    <div className="heart">
    <div className="likeHeart">
      <Heart isLike={isLike} isClick={isClick} onClick={() => 
          {  
                setClick(!isClick)
                if(!isClick){
                          likes=isLike+1
                          setLike(likes)
                           console.log(likes)
                }
                else{
                  likes=isLike-1
                  setLike(likes)
                  console.log(likes)
                }
                
          }} />
     </div>
      <div className="likeCount">
               likes: {isLike}
      </div> 
     </div>
  );
  
}