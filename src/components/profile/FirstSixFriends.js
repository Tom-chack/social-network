import React, { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { Input } from "antd";
import api from "../../helpers/api";

function FirstSixFriends () {
  const { user } = useSelector((state) => state.userDuck);
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState("");
  
  useEffect(() => {
    fetch(`${api}/users`)
      .then((res) => res.json())
      .then((res) => setUsers(res));
  }, []);

  let arrayOfFriends = [];
  users?.map((item) => {
    if (item.id === user.id) {
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
        </div>
      </>
      
    )
}

export default FirstSixFriends;