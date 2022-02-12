import { Button, Image, Input} from "antd";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../../helpers/api";

function FriendsContent() {
  const [btnShown, setBtnShown] = useState(false);
  const { profile } = useSelector((state) => state.userDuck);
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch(`${api}/users`)
      .then((res) => res.json())
      .then((res) => setUsers(res));
  }, []);

  let filteredFriends = profile.friends.map((item) => {
    return users.filter((el) => el.id === item);
  });

  filteredFriends = filteredFriends.flat();

  const handleInput = (e) => {
    setValue(e.target.value);
  };
  const handleBtn = () => {
    setBtnShown(!btnShown)
  }
  
  return (
    <>
      <div className="search-bar-container" key={"search-bar" + profile.name}>
        <h2>Friends {profile.friends.length}</h2>
        <Input
          className="search-box"
          value={value}
          type="text"
          onChange={handleInput}
          placeholder="Search"
        />
      </div> 
      <div className="friends-list-container" key={"friends" + profile.name}>
        {filteredFriends
          .filter((item) => {
            if (value === "") {
              return item;
            } else if (item.name.toLowerCase().includes(value.toLowerCase())) {
              return item;
            }
          }).map((item, index) => {
          if (index < 6) {
            return (
              <>
                <div className="friends-list-avatars" key={"friends-list"+item.id}>
                  <div>
                    <Image
                      key={"cover" + item.id}
                      className="cover"
                      src={item.cover}
                      alt="cover pic can't be uploaded"
                    />
                  </div>
                  <div>
                    <Image
                      key={item.id}
                      className="avatar"
                      src={item.avatar}
                      alt="user pic can't be uploaded"
                    />
                  </div>
                  <div className="username" key={"username"+item.id}>
                    <Link key={ "names" + item.id} to={`/profile/${item.id}`} style={{ color: "gray" }}>
                      {item.name}
                    </Link>
                  </div>
                </div>
              </>
            );
          }
        })}
        ;
      </div>
        <div className="friends-list-container" key={"filterd-friends" + profile.id}>
        {btnShown ? <div className="friends-list-container" key="container">
      {filteredFriends.filter((item) => {
            if (value === "") {
              return item;
            } else if (item.name.toLowerCase().includes(value.toLowerCase())) {
              return item;
            }
          }).map((item, index) => {
        if (index >= 6) {
          return (
            <>
              <div className="friends-list-avatars" key={"avatars" + item.id}>
                <div>
                  <Image
                    key={"filtered-cover" + item.id}
                    className="cover"
                    src={item.cover}
                    alt="cover pic can't be uploaded"
                  />
                </div>
                <div>
                  <Image
                    key={"image" + item.id}
                    className="avatar"
                    src={item.avatar}
                    alt="user pic can't be uploaded"
                  />
                </div>
                <div className="username" key={"about-name" + item.id}>
                  <Link key={"links" + item.id} to={`/profile/${item.id}`} style={{ color: "gray" }}>
                    {item.name}
                  </Link>
                </div>
              </div>
            </>
          );
        }
      })}
      ;
    </div> : <Button className="show-more" key= "btn" style={{margin:"0 10px"}} onClick={handleBtn} >Load more </Button> }
      </div>
    </>
  );
}

export default FriendsContent;