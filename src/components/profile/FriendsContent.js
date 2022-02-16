import { Button, Image, Input } from "antd";
<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import getUsers from "../../services/getUsers";

function FriendsContent() {
  const dispatch = useDispatch();
  const [btnShown, setBtnShown] = useState(false);
  const { profile } = useSelector((state) => state.userDuck);
  const [value, setValue] = useState("");
  const { users } = useSelector((state) => state.userDuck);
>>>>>>> main
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

<<<<<<< HEAD
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
=======
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  //loading more friends when clicking to show more button
  const handleBtn = () => {
    setLoadFriends(filteredFriends.length);
    setBtnShown(!btnShown);
  };

  return (
    <>
>>>>>>> main
      <div className="search-bar-container">
        <h2>Friends {profile.friends.length}</h2>
        <Input
          className="search-box"
<<<<<<< HEAD
          type="text"
          onChange={debouncedResults}
=======
          value={value}
          type="text"
          onChange={handleInput}
>>>>>>> main
          placeholder="Search"
        />
      </div>
      <div className="friends-list-container" key="container">
<<<<<<< HEAD
        {value && filteredFriends.length === 0 ? <span>No members found ...</span> : filteredFriends
          .slice(0, loadFriends)
=======
        {filteredFriends
          .slice(0, loadFriends)
          .filter((item) => {
            if (value === "") {
              return item;
            } else if (item.name.toLowerCase().includes(value.toLowerCase())) {
              return item;
            }
          })
>>>>>>> main
          .map((item) => {
            return (
              <div key={item.id} className="friends-list-avatars">
                <div>
                  <Image
                    className="cover"
                    src={item.cover}
                    alt="cover pic can't be uploaded"
                  />
                </div>
                <div>
                  <Image
                    className="avatar"
                    src={item.avatar}
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
<<<<<<< HEAD
      {loadFriends <= filteredFriends.length ? (
        <Button
          className={value ? "hidden" : "show-more"}
=======
      {!btnShown ? (
        <Button
          className="show-more"
>>>>>>> main
          key="btn"
          style={{ margin: "0 10px" }}
          onClick={handleBtn}
        >
          Load more{" "}
        </Button>
      ) : (
        ""
      )}
<<<<<<< HEAD
    </div>
=======
    </>
>>>>>>> main
  );
}

export default FriendsContent;
