import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import {
 BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./style.scss";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const {currentUser} = useContext(AuthContext)
  console.log(currentUser);

const ProtectedRoute = ({children})=>{
  if(!currentUser) {
    return <Navigate to={"/login"}></Navigate>
  }

  return children
}
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
          <Route path="register" element={<Register/>}></Route>
          <Route path="login" element={<Login/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
