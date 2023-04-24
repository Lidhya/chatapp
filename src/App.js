import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import {
 BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import "./style.scss";

function App() {
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
