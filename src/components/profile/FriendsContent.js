import { Button } from "antd";
import React, { useState} from "react";
import FirstSixFriends from "./FirstSixFriends";
import RestFriends from "./RestFriends";

function FriendsContent() {
  const [btnShown, setBtnShown] = useState(false)

  const handleBtn = () => {
    setBtnShown(!btnShown)
  }

  return (
    <>
      <FirstSixFriends />
        <div className="friends-list-container">
        {btnShown ? <RestFriends /> : <Button className="show-more" key= "btn" style={{margin:"0 10px"}} onClick={handleBtn} >Load more </Button> }
      </div>
    </>
  );
}

export default FriendsContent;