import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((state) => state.userDuck);
  console.log(user)
  return (
    <div className='home'>
      <h1>Home</h1>
      {user.id && <div>Current User: {user.username}</div>}
    </div>
  );
}

export default Home;
