import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import getUsers from '../services/getUsers'


function Members() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userDuck);

  useEffect(() => {
      dispatch(getUsers());
  }, [dispatch])

  return (
    <div className="member-container">
    </div>
  )
}

export default Members;