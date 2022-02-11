import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import { dateToLocalFormat } from 'date-format-ms';
import { useEffect } from "react";
import getUsers from '../services/getUsers'
import './members.css'


function Members() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userDuck);

  useEffect(() => {
      dispatch(getUsers());
  }, [dispatch])


  const getDate = (sec) =>{
   return dateToLocalFormat(new Date(sec), 'd.m.Y')
  }

  return (
    <div className="members-container">
      
      <div className="members-content">
        
        <div className="search-container">
          
          <span>Members</span>
          
          <input 
            type={'text'} 
            placeholder={'Search . . .'}
          />

        </div>

        {
          users.map(item=>(
            
            <div className="users-container" key={item.id}>

          <div className="background-part">
            <img 
              src={item.covers}
              alt="cover-img"
            />
            
            <div className="img-container">

              <img
               alt="avatar"
               src={item.avatar}
               />   

            </div>

          </div>

          <div className="info-part">

            <div>

              <Link to={`/profile/${item.id}`}>
                <span>{item.name}</span>
              </Link>

              <span style={{color: "grey"}}>{`Joined ${getDate(item.date)}`}</span>

            </div>

          </div>

        </div>

          ))
        }

      </div>

      <div className="widgets-content">

      </div>

    </div>
  )
}

export default Members;