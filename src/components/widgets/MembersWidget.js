import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import getUsers from "../../services/widget";
import { Avatar, Card } from "antd";
import { Link } from "react-router-dom";

const MembersWidget = () => {
  //Users
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.widgetDuck);

  useEffect(() => {
    dispatch(getUsers("?_sort=date&_order=desc&_start=0&_end=12"));
  }, [dispatch]);

  return (
    <Card className='widget' style={{ backgroundColor: "#fafafa" }}>
      <div className='header-div'>
        <h2>Latest Members</h2>
      </div>
      <div className='photo-content'>
        <div className='members-content-div'>
          {users.map((item) => (
            <div key={item.id}>
              <Link to={`/profile/${item.id}`}>
                <Avatar size={60} src={item.avatar} alt={item.name && item.username} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MembersWidget;
