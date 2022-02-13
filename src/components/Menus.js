import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "antd";
import { menus } from "../helpers/menus";
import { userLogout } from "../redux/ducks/userDuck";

function Menus() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  const dispatch = useDispatch();
  const { loggedIn, user } = useSelector((state) => state.userDuck);

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
    </Menu>
  );
}

export default Menus;
