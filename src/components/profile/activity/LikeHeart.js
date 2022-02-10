import React, { useState } from "react";
import Heart from "react-animated-heart";
export default function LikeHrart({likes}) {
  const [isClick, setClick] = useState(false);
  return (
    <div className="heart">
      <Heart  isClick={isClick} onClick={() => 
          {
                setClick(!isClick)
          }} />
    </div>
  );
}