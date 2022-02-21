import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userInit } from "./redux/ducks/userDuck";

import Structure from "./components/Structure";
import Home from "./components/Home";
import Members from "./components/Members";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import Test from "./components/Test";

function App() {
  //Check if there is a user information in localStorage and authorize current visitor
  useDispatch()(userInit());

  return (
    <Routes>
      <Route path='/' element={<Structure />}>
        <Route index element={<Home />} />
        <Route path='/members' element={<Members />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/test' element={<Test />} />
      </Route>
    </Routes>
  );
}

export default App;
