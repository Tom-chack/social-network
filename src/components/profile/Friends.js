import React, { useEffect, useState } from "react";
import api from "../../helpers/api";
import { useSelector } from "react-redux";

function Friends() {
  const { profile } = useSelector ((state) => state.userDuck);
  const [ users, setUsers ] = useState ([]);

  useEffect (() => {
    fetch (`${api}/users`)
    .then (res => res.json())
    .then (res => setUsers(res))
  }, [])

  return (
    <div className="friends-list-container">
      {profile.friends.map((item) => {
        return users?.map (el => {
          return (el.id === item ? 
            <div className="friends-list-avatars" key = {el.id}>
              <div>
                <img className="cover" src={el.cover} alt="cover pic can't be uploaded"/>
              </div>
              <div>  
                <img className="avatar" src={el.avatar} alt="profile pic can't be uploaded"/>
              </div>  
              <div className="username">{el.name}</div>
            </div> : "")})
      })}
    </div>
  )
}

export default Friends;
