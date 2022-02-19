import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import getUsers from '../../services/widget';
import { Avatar } from "antd";
import { AVATAR } from "../../helpers/constants";
import { Link } from "react-router-dom";



const MembersWidget = () =>{

//Users 
const dispatch = useDispatch();
const { users } = useSelector((state) => state.widgetDuck);

const [usersData, setUsersData] = useState([])



useEffect(() => {
    dispatch(getUsers("?_sort=date&_order=desc"));
  }, [dispatch])


useEffect(()=>{
    if(users.length <= 12){
        setUsersData(users)
    }
    else{
        setUsersData(users.slice(1,13))
    }
},[users])


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
                    usersData.map(item=>(
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