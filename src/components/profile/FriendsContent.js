import React, { useState} from "react";
import FirstSixFriends from "./FirstSixFriends";

function FriendsContent() {
  const [btnShown, setBtnShown] = useState(false)

  const handleBtn = () => {
    setBtnShown(!btnShown)
  }

  return (
    <>
      <FirstSixFriends />
        {/* <div className="friends-list-container">
        {btnShown ? <div className="friends-list-container">
        {arrayOfFriends.map((item, index) => {
          if (index >= 6) {
            return users?.map((el) => {
              return el.id === item ? (
                <div className="friends-list-avatars" key={el.id}>
                  <div>
                    <img
                      className="cover"
                      src={el.cover}
                      alt="cover pic can't be uploaded"
                    />
                  </div>
                  <div>
                    <img
                      className="avatar"
                      src={el.avatar}
                      alt="user pic can't be uploaded"
                    />
                  </div>
                  <div className="username">{el.name}</div>
                </div>
              ) : (
                ""
              );
            });
          }
        })}
      </div> : <button key= "btn" style={{margin:"0 10px"}} onClick={handleBtn} >Load more </button> }
      </div> */}
    </>
  );
}

export default FriendsContent;