import { Button, Image, Input, Card } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import getUsers from "../../../services/getUsers";
import "./friends.css";

function FriendsContent() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userDuck);
  const [value, setValue] = useState("");
  const { users } = useSelector((state) => state.userDuck);
  const countToBeLoaded = 5;
  const [loadFriends, setLoadFriends] = useState(5);

  //fetching users
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  //filtering friends of current profile
  let filteredFriends = profile.friends.map((item) => {
    return users.filter((el) => el.id === item);
  });

  filteredFriends = filteredFriends.flat();

  if (value !== "") {
    filteredFriends = filteredFriends.filter((item) => {
      return item.name?.toLowerCase().includes(value?.toLowerCase());
    });
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
    setValue(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounceFunction(handleInput, 1000);
  }, []);

  //loading more friends when clicking to show more button
  const handleBtn = () => {
    if (loadFriends <= filteredFriends.length) {
      setLoadFriends(loadFriends + countToBeLoaded);
    }
  };

  return (
    <div className='friends-container'>
      <div className='friends-bar'>
        <h2>Friends / {profile.friends.length}</h2>
        <Input
          className='search-box'
          type='text'
          onChange={debouncedResults}
          placeholder='Search'
        />
      </div>
      <Card style={{ backgroundColor: "#fafafa" }}>
        <div className='friends'>
          {value && filteredFriends.length === 0 ? (
            <span>No members found ...</span>
          ) : (
            filteredFriends.slice(0, loadFriends).map((item) => {
              return (
                <Card key={item.id} className='friend-card'>
                  <div
                    className='friend-head'
                    style={{ backgroundImage: `url(${item.cover})` }}
                  ></div>
                  <div>
                    <Image
                      className='friend-avatar'
                      src={item.avatar}
                      alt={`${item.username} avatar`}
                    />
                  </div>
                  <div className='friend-name'>
                    <Link to={`/profile/${item.id}`} style={{ color: "gray" }}>
                      {item.name}
                    </Link>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </Card>
      {loadFriends <= filteredFriends.length ? (
        <Button
          className={value ? "hidden" : "show-more"}
          key='btn'
          style={{ margin: "0px auto", display: "block" }}
          onClick={handleBtn}
          type='primary'
          size='large'
        >
          Load more
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}

export default FriendsContent;
