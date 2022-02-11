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

  console.log("users=",users);
  console.log ("profile=",profile.friends)
  return (
    <div className="friends-list-container">
      {profile.friends.map((item) => {
        return users?.map (el => {
          return (el.id === item ? <span key = {el.id}>{el.username}</span> : "")})
      })}
    </div>
  )
}

export default Friends;
