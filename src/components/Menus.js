import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "antd";
import { menus } from "../helpers/menus";
import { userLogout } from "../redux/ducks/userDuck";
import api from "../helpers/api";

function Menus() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  const dispatch = useDispatch();
  const { loggedIn, user } = useSelector((state) => state.userDuck);

  const [loginUser, setLoginUser] = useState({});

  useEffect(() => {
    fetch(`${api}/users/${user.id}`)
      .then((user) => user.json())
      .then((user) => {
        setLoginUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [setLoginUser, user]);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [currentPath, location]);

  const handleMenu = (e) => {
    if (e.key === "logout") {
      dispatch(userLogout());
      window.location.assign("/login");
    }
  };

  const trim = (path) => {
    return path.replace(/^\//, "");
  };

  return (
    <Menu theme='dark' mode='horizontal' defaultSelectedKeys={[trim(currentPath)]}>
      {menus
        .filter((menu) => menu.login === loggedIn || menu.logout === !loggedIn)
        .map((menu) => (
          <Menu.Item key={trim(menu.path)} onClick={(e) => handleMenu(e)}>
            {menu.label === "Logout" ? (
              <span>{menu.label}</span>
            ) : menu.label === "Profile" ? (
              <Link to={menu.path + "/" + user.id}>
                <span>{menu.label}</span>
              </Link>
            ) : (
              <Link to={menu.path}>
                <span>{menu.label}</span>
              </Link>
            )}
          </Menu.Item>
        ))}
      {loggedIn && (
        <Menu.Item key='100' className='menu-profile' style={{ backgroundColor: "transparent" }}>
          <Link to={"/profile/" + user.id}>
            <img
              src={loginUser.avatar}
              alt={loginUser.name || loginUser.username}
              style={{ width: "40px", borderRadius: "50%", border: "2px #f5f5f5 solid" }}
            />
          </Link>
        </Menu.Item>
      )}
    </Menu>
  );
}

export default Menus;
