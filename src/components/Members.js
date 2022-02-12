import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { dateToLocalFormat } from 'date-format-ms';
import { useEffect } from "react";
import getUsers from '../services/getUsers';
import './Members/members.css';
import { Image } from 'antd';
import Pagination from './Members/Pagination'


function Members() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userDuck);
  

  const [filteredUsers, setFilteredUsers] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  

  const usersPerPage = 5;
  const lastIndex = currentPage * usersPerPage
  const firstIndex = lastIndex - usersPerPage
  const current = filteredUsers.slice(firstIndex, lastIndex)
  const total = Math.ceil(filteredUsers.length/usersPerPage)
  

  const paginate = pageNumber => setCurrentPage(pageNumber)
  const nextPage = () => {
    setCurrentPage(prev=>{
      if(prev < total){
        return prev +1
      }
      return prev
    })
  }
  const prevPage = () => {
    setCurrentPage(prev=> {
      if(prev > 1){
        return prev - 1
      }
      return prev
    })
  }

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch])

  useEffect(()=>{
    setFilteredUsers(users)
  },[users])

  useEffect(()=>{
    searchUsers()
    setCurrentPage(1)
  },[inputValue])

  const getDate = (sec) =>{
   return dateToLocalFormat(new Date(sec), 'd.m.Y')
  }

  const searchUsers = () =>{

    let searchedUsers = [] ;

    if (inputValue === ''){
      searchedUsers = users;
    }
    else{
      searchedUsers = users.filter((item)=>{
        if (item.name?.toLowerCase().includes(inputValue.toLowerCase())){
          return item;
        }
      })
    }
    setFilteredUsers(searchedUsers)
  }

  return (
    <div className="members-container">
      
      <div className="members-content">
        
        <div className="search-container">
          
          <span>Members</span>
          
          <input 
            onChange={(e)=>setInputValue(e.target.value)}
            type={'text'}
            placeholder={'Search . . .'}
          />

        </div>

        {
          current.map(item=>(
            
            <div className="users-container" key={item.id}>

          <div className="background-part">
            <img 
              src={item.covers}
              alt="cover-img"
            />
            
            <div className="img-container">

            <Image
          src={item.avatar}
          style={{
            width: 92, height : 92
          }}
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

       <Pagination 
          usersPerPage={usersPerPage}
          total={filteredUsers.length}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
       />
      
        
      </div>

      <div className="widgets-content">

      </div>

    </div>
  )
}

export default Members;