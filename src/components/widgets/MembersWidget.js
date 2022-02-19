import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import getUsers from '../../services/widget';
import { Avatar } from "antd";
import { AVATAR } from "../../helpers/constants";
import { Link } from "react-router-dom";



const MembersWidget = () =>{

//Users 
const dispatch = useDispatch();
const { users } = useSelector((state) => state.widgetDuck);



useEffect(() => {
    dispatch(getUsers("?_sort=date&_order=desc&_start=0&_end=12"));
  }, [dispatch])



    return(
        <div className="members-widget-content">
            <div className="header-div">
                <div className="header-content">
                    <span>Latest Members</span>
                </div>
            </div>
            <div className="photo-content">
                <div className="members-content-div">
                    {
                    users.map(item=>(
                       <div key={item.id}>
                            <Link to={`/profile/${item.id}`}>
                                <Avatar size={60} src={item.avatar?item.avatar:AVATAR} />
                            </Link>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
}

export default MembersWidget