import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { dateToLocalFormat } from "date-format-ms";
import { useEffect } from "react";
import getUsers from "../services/getUsers";
import "./members.css";
import { Image, Row, Col, Card } from "antd";
import ReactPaginate from "react-paginate";
import PostWidget from "./widgets/PostsWidget.js";
import PhotoWidget from "./widgets/PhotosWidget.js";

function Members() {
  //Users
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userDuck);

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  //Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = filteredUsers.slice(pagesVisited, pagesVisited + usersPerPage);
  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //Getting users
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  //Getting date from users

  const getDate = (sec) => {
    return dateToLocalFormat(new Date(sec), "d.m.Y");
  };

  //Searching users by name
  const searchUsers = useCallback(() => {
    let searchedUsers = [];
    if (inputValue === "") {
      searchedUsers = users;
    } else {
      searchedUsers = users.filter((item) => {
        if (item.name?.toLowerCase().includes(inputValue.toLowerCase())) {
          return item;
        } else {
          return null;
        }
      });
    }
    setFilteredUsers(searchedUsers);
  }, [users, inputValue]);

  useEffect(() => {
    searchUsers();
    setPageNumber(0);
  }, [inputValue, searchUsers]);

  const inpVal = (e) => {
    setInputValue(e.target.value);
  };

  const debounce = (fn, ms) => {
    let timeout;
    return function () {
      const fnCall = () => {
        fn.apply(this, arguments);
      };
      clearTimeout(timeout);
      setTimeout(fnCall, ms);
    };
  };

  return (
    <div className='home'>
      <Row>
        <Col flex='1 1 300px' style={{ padding: "20px" }}>
          <Card style={{ backgroundColor: "#fafafa" }}>
            <Row>
              <Col flex={5}>
                <h2 style={{ margin: 0 }}>Members</h2>
              </Col>
              <Col flex={1} align='right'>
                <input
                  onChange={debounce(inpVal, 1000)}
                  type={"text"}
                  placeholder={"Search..."}
                  style={{ width: "100%", border: "1px solid #cecece", padding: "5px 10px" }}
                />
              </Col>
            </Row>
          </Card>
          <div className='members-content'>
            {inputValue && displayUsers.length === 0 ? (
              <span className='not-found'>No Members Found</span>
            ) : (
              displayUsers.map((item) => (
                <Card
                  className='users-container'
                  key={item.id}
                  style={{ backgroundColor: "#fafafa" }}
                >
                  <div
                    className='member-head'
                    style={{ backgroundImage: `url(${item.cover})` }}
                  ></div>
                  <div className='img-container'>
                    <Image
                      src={item.avatar}
                      style={{
                        width: 92,
                        height: 92,
                      }}
                    />
                    <div className='member-name'>
                      <Link to={`/profile/${item.id}`}>{item.name}</Link>
                    </div>
                    <div className='member-date'>{`Joined ${getDate(item.date)}`}</div>
                  </div>
                </Card>
              ))
            )}

            {filteredUsers.length <= 4 ? null : (
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previusBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
            )}
          </div>
        </Col>
        <Col flex='0 1 400px' style={{ padding: "20px 20px 0 0" }}>
          <PostWidget />
          <PhotoWidget />
        </Col>
      </Row>
    </div>
  );
}

export default Members;
