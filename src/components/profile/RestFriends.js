import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Image } from "antd";
import api from "../../helpers/api";

export default function RestFriends () {
    const { profile } = useSelector((state) => state.userDuck);
    const [users, setUsers] = useState([]);

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
    
      arrayOfFriends = arrayOfFriends.flat();
    return (
        <div className="friends-list-container">
        {arrayOfFriends.map((item, index) => {
          if (index >= 6) {
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
                    <a
                      href={`/profile/${el.id}`}
                      style={{color: "gray"}}
                    >
                      {el.name}
                    </a>
                  </div>
                </div>
              ) : (
                ""
              );
            });
          }
        })}
      </div>

    )
}