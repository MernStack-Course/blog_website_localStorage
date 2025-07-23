import { Link, NavLink, Outlet } from "react-router-dom";
import "./App.css";
import CustomInput from "./components/CustomInput";
import Navbar from "./pages/Navbar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreatePost from "./pages/CreatePost";
import { ToastContainer } from "react-toastify";
import { useAuthContext } from "./context/Auth";

function App() {
  const {isAuth} = useAuthContext();
  return (
    <>
    <ToastContainer/>
      <div className=" sticky flex items-center justify-between shadow bg-white p-4 ">
        <div className="pl-10 flex gap-10">
          <NavLink to="/">Home</NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "text-blue-700" : "")}
            to="/post"
          >
            Posts
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "text-blue-700" : "")}
            to="/createPost"
          >
            Create Post
          </NavLink>
          
        </div>
        <div className="pr-10">

          {
            isAuth ?
          <NavLink
            className="bg-blue-500 text-white p-2 rounded-md font-semibold border-none
          transition-all hover:bg-blue-600
          "
            to="/signin"
          >
            SignIn
          </NavLink>
          : <NavLink
            className="bg-blue-500 text-white p-2 rounded-md font-semibold border-none
          transition-all hover:bg-blue-600
          "
            to="/signup"
          >
            SignUp
          </NavLink>
          }
        </div>
      </div>
      <Outlet />
      
      {/* <CreatePost/> */}
    </>
  );
}

export default App;
