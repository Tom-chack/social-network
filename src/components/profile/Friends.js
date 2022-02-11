import React, { useEffect, useState } from "react";
import api from "../../helpers/api";
import { useSelector } from "react-redux";
import { Input } from "antd";

function Friends() {
  const { profile } = useSelector ((state) => state.userDuck);
  const [ users, setUsers ] = useState ([]);
  const [value, setValue] = useState ("");

  useEffect (() => {
    fetch (`${api}/users`)
    .then (res => res.json())
    .then (res => setUsers(res))
  }, [])

  const handleInput = (e) => {
    setValue(e.target.value);
  }
  console.log (value)
  return (
    <>
      <div className="search-bar-container">
        <h2>Friends {profile.friends.length}</h2>
        <Input className="search-box" value={value} type="text" onChange={handleInput} placeholder="Search" />
      </div>
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
    </>
    
  )
}

export default Friends;
