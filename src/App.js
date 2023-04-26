import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import {
 BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import "./style.scss";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const {currentUser} = useContext(AuthContext)
  console.log(currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home/>}></Route>
          <Route path="register" element={<Register/>}></Route>
          <Route path="login" element={<Login/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
