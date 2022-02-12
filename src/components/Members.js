import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { dateToLocalFormat } from 'date-format-ms';
import { useEffect } from "react";
import getUsers from '../services/getUsers';
import './members.css';
import { Image } from 'antd';
import ReactPaginate from "react-paginate";


function Members() {

  //Getting users 
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userDuck);
  

  //Users
  const [filteredUsers, setFilteredUsers] = useState([])
  const [inputValue, setInputValue] = useState('')
  

  //Pagination
  const [pageNumber, setPageNumber] = useState(0)
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage

  const displayUsers = filteredUsers.slice(pagesVisited, pagesVisited + usersPerPage)
  const pageCount = Math.ceil(filteredUsers.length/usersPerPage)

  const changePage = ({selected}) =>{
    setPageNumber(selected)
  }
 
  

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch])

  useEffect(()=>{
    setFilteredUsers(users)
  },[users])

  useEffect(()=>{
    searchUsers()
    setPageNumber(0)
  },[inputValue])


  //Getting date from users

  const getDate = (sec) =>{
   return dateToLocalFormat(new Date(sec), 'd.m.Y')
  }


  //Searching users by name

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
          displayUsers.map(item=>(
            
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
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'paginationBttns'}
          previousLinkClassName={'previusBttn'}
          nextLinkClassName={'nextBttn'}
          disabledClassName={'paginationDisabled'}
          activeClassName={'paginationActive'}
        />
       
      
        
      </div>

      <div className="widgets-content">

      </div>

    </div>
  )
}

export default Members;