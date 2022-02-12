import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Input, Image } from "antd";
import api from "../../helpers/api";

function FirstSixFriends () {
  const { profile } = useSelector((state) => state.userDuck);
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState("");
  
  useEffect(() => {
    fetch(`${api}/users`)
      .then((res) => res.json())
      .then((res) => setUsers(res));
  }, []);

  let arrayOfFriends = [];
  users?.map((item) => {
    if (item.id === profile.id) {
      return arrayOfFriends.push(item.friends);
    }
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };
  
  arrayOfFriends = arrayOfFriends.flat();
    return (
      <>
        <div className="search-bar-container">
      <h2>Friends {arrayOfFriends.length}</h2>
      <Input
        className="search-box"
        value={value}
        type="text"
        onChange={handleInput}
        placeholder="Search"
      />
    </div>
        <div className="friends-list-container">
        {arrayOfFriends.map((item, index) => {
          if (index < 6) {
            return users?.map((el) => {
              return el.id === item ? (
                <div className="friends-list-avatars" key={el.id}>
                  <div>
                    <Image
                      className="cover"
                      src={el.cover}
                      alt="cover pic can't be uploaded"
                    />
                  </div>
                  <div>
                    <Image
                      className="avatar"
                      src={el.avatar}
                      alt="user pic can't be uploaded"
                    />
                  </div>
                  <div className="username">
                    <Link
                      to={`/profile/${el.id}`}
                      style={{color: "gray"}}
                    >
                      {el.name}
                    </Link>
                  </div>
                </div>
              ) : (
                ""
              );
            });
          }
        })}
        </div>
      </>
      
    )
}

export default FirstSixFriends;