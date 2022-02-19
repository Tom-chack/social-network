import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { dateToLocalFormat } from 'date-format-ms';
import { useEffect } from "react";
import getUsers from '../services/getUsers';
import './members.css';
import { Image,Avatar } from 'antd';
import ReactPaginate from "react-paginate";
import PostWidget from './widgets/PostsWidget.js'
import PhotoWidget from './widgets/PhotosWidget.js'
import {AVATAR, COVER} from '../helpers/constants'


function Members() {

  //Users 
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userDuck);


  const [filteredUsers, setFilteredUsers] = useState([])
  const [inputValue, setInputValue] = useState('')


  //Pagination
  const [pageNumber, setPageNumber] = useState(0)
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage

  const displayUsers = filteredUsers.slice(pagesVisited, pagesVisited + usersPerPage)
  const pageCount = Math.ceil(filteredUsers.length / usersPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }


//Getting users
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch])


  useEffect(() => {
    setFilteredUsers(users)
  }, [users])

  
  useEffect(() => {
    searchUsers()
    setPageNumber(0)
  }, [inputValue])



  //Getting date from users

  const getDate = (sec) => {
    return dateToLocalFormat(new Date(sec), 'd.m.Y')
  }


  //Searching users by name

  const searchUsers = () => {
    let searchedUsers = [];
    if (inputValue === '') {
      searchedUsers = users;
    }
    else {
      searchedUsers = users.filter((item) => {
        if (item.name?.toLowerCase().includes(inputValue.toLowerCase())) {
          return item;
        }
      })
    }
    setFilteredUsers(searchedUsers)
  }
 

  const inpVal = (e) =>{
    setInputValue(e.target.value)
  }


  const debounce = (fn, ms) =>{
    let timeout;
    return function () {
      const fnCall = () => {fn.apply(this,arguments)}
      clearTimeout(timeout)
      setTimeout(fnCall, ms)
    }
  }

 

  return (

    <div className="members-container">
      <div className="members-content">
        <div className="search-container">
          <span>Members</span>
          <input
            onChange={debounce(inpVal, 1000)}
            type={'text'}
            placeholder={'Search . . .'}
          />
        </div>

        {
          inputValue && displayUsers.length === 0 ? (<span className="not-found">No Members Found</span>) : displayUsers.map(item => (
            <div className="users-container" key={item.id}>
              <div className="background-part">
                <img
                  src={item.covers?item.covers:COVER}
                  alt="cover-img"
                />
                <div className="img-container">
                  <Avatar
                    size={92}
                    src={<Image
                    src={item.avatar?item.avatar:AVATAR}
                    style={{
                      width: 92, height: 92
                    }}
                  />} 
                  />
                </div>
              </div>
              <div className="info-part">
                <div>
                  <Link to={`/profile/${item.id}`}>
                    <span>{item.name}</span>
                  </Link>
                  <span style={{ color: "grey" }}>{`Joined ${getDate(item.date)}`}</span>
                </div>
              </div>
            </div>
          ))
        }

        {
          filteredUsers.length <= 5 ? null : <ReactPaginate
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
        }

      </div>
      <div className="widgets-content">
        <PostWidget />
        <PhotoWidget />
      </div>
    </div>
  )
}

export default Members;