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

        <div className="users-container">

          <div className="background-part">
            <img 
              src="https://images.unsplash.com/photo-1547989453-11e67ffb3885?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
              alt="bg-img"
            />
            
            <div className="img-container">

              <img
               alt="avatar"
               src="https://qph.fs.quoracdn.net/main-thumb-1278318002-200-ydzfegagslcexelzgsnplcklfkienzfr.jpeg"
              />   

            </div>

          </div>

          <div className="info-part">

            <div>

              <Link to={'/'}>
                <span>Clara Tomson</span>
              </Link>

              <span style={{color: "grey"}}>{`Joined ${getDate(1519211809934)}`}</span>

            </div>

          </div>

        </div>

      </div>

      <div className="widgets-content">

      </div>

    </div>
  )
}

export default Members;