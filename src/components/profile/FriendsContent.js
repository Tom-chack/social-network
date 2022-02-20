import { Button, Image, Input } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import getUsers from "../../services/getUsers";
import "../profile/friends.css";

function FriendsContent() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userDuck);
  const [value, setValue] = useState("");
  const { users } = useSelector((state) => state.userDuck);
  const countToBeLoaded = 6;
  const [loadFriends, setLoadFriends] = useState(6);

  //fetchings users
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  //filtering friends of current profile
  let filteredFriends = profile.friends.map((item) => {
    return users.filter((el) => el.id === item);
  });

  filteredFriends = filteredFriends.flat();

  if (value !== ""){
    filteredFriends = filteredFriends
    .filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
    })
  }

  //delaying search results to show
  const debounceFunction = (func, delay) => {
    let timer;
    return function () {
      const fnCall = () => {
        func.apply(this, arguments);
      };
      clearTimeout(timer);
      setTimeout(fnCall, delay);
    };
  };

  let handleInput = (e) => {
    setValue(e.target.value)
  };

  const debouncedResults = useMemo(() => {
    return debounceFunction(handleInput, 1000);
  }, []);

  //loading more friends when clicking to show more button
  const handleBtn = () => {
    if (loadFriends >= filteredFriends.length) console.log(loadFriends);
    setLoadFriends(loadFriends + countToBeLoaded);
  };

  return (
    <div className="card-container">
      <div className="search-bar-container">
        <h2>Friends {profile.friends.length}</h2>
        <Input
          className="search-box"
          type="text"
          onChange={debouncedResults}
          placeholder="Search"
        />
      </div>
      <div className="friends-list-container" key="container">
        {value && filteredFriends.length === 0 ? <span>No members found ...</span> : filteredFriends
          .slice(0, loadFriends)
          .map((item) => {
            return (
              <div key={item.id} className="friends-list-avatars">
                <div>
                  <Image
                    className="cover"
                    src={item.cover ? item.cover : "default cover link"}
                    alt="cover pic can't be uploaded"
                  />
                </div>
                <div>
                  <Image
                    className="avatar"
                    src={item.avatar ? item.avatar : 'default avatar link'}
                    alt="user pic can't be uploaded"
                  />
                </div>
                <div className="username">
                  <Link to={`/profile/${item.id}`} style={{ color: "gray" }}>
                    {item.name}
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
      {loadFriends <= filteredFriends.length ? (
        <Button
          className={value ? "hidden" : "show-more"}
          key="btn"
          style={{ margin: "0 10px" }}
          onClick={handleBtn}
        >
          Load more{" "}
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}

export default FriendsContent;
