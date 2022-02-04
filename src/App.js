import {
  Routes,
  Route
} from "react-router-dom";

import Structure from './components/Structure';
import Home from "./components/Home";
import Members from "./components/Members";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Structure />}>
        <Route index element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
