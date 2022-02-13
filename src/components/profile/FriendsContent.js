import { Button, Image, Input } from "antd";
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
      <div className="search-bar-container">
        <h2>Friends {profile.friends.length}</h2>
        <Input
          className="search-box"
          value={value}
          type="text"
          onChange={handleInput}
          placeholder="Search"
        />
      </div>
      <div className="friends-list-container">
        {filteredFriends
          .slice(0, loadFriends)
          .filter((item) => {
            if (value === "") {
              return item;
            } else if (item.name.toLowerCase().includes(value.toLowerCase())) {
              return item;
            }
          })
          .map((item) => {
            return (
              <>
                <div className="friends-list-avatars" key={item.id}>
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
              </>
            );
          })}
        ;
      </div>
      {!btnShown ? (
        <Button
          className="show-more"
          key="btn"
          style={{ margin: "0 10px" }}
          onClick={handleBtn}
        >
          Load more{" "}
        </Button>
      ) : (
        ""
      )}
    </>
  );
}

export default FriendsContent;
