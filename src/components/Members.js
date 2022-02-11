import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import getUsers from '../services/getUsers'
import './members.css'


function Members() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userDuck);

  useEffect(() => {
      dispatch(getUsers());
  }, [dispatch])

  return (
    <div className="members-container">
      
      <div className="members-content">
        
        <div className="search-div">
          
          <span>Members</span>
          
          <input 
            type={'text'} 
            placeholder={'Search . . .'}
          />

        </div>

      </div>

      <div className="widgets-content">

      </div>

    </div>
  )
}

export default Members;