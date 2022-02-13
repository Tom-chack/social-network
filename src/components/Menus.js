import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { menus } from "../helpers/menus";

function Menus() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [currentPath, location]);

  const { user } = useSelector((state) => state.userDuck);

  console.log(currentPath);

  return (
    <Menu theme='dark' mode='horizontal' defaultSelectedKeys={[currentPath]}>
      {menus.map((menu) => (
        <Menu.Item key={menu.path}>
          <Link to={menu.path}>
            <span>{menu.label}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default Menus;
