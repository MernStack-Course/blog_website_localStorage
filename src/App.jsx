import {  NavLink, Outlet } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { useAuthContext } from "./context/Auth";
import { FiSun, FiMoon } from "react-icons/fi";
function App() {
  const { isAuth,signOut } = useAuthContext();
  return (
    <>
      <ToastContainer />
      <div className=" sticky flex items-center justify-between shadow bg-white p-4 ">
        <div className="pl-10 flex gap-10">
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-blue-700" : "")}>Home</NavLink>
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
          {/* <FiSun/>
          <FiMoon/> */}
        </div>
        <div className="pr-10">
          {isAuth ? (
            <button type="button" onClick={signOut} className="bg-blue-500 text-white p-2 rounded-md font-semibold border-none
          transition-all hover:bg-blue-600
          " >
            SignOut
            </button>
            
          ) : (
            <div className="flex gap-10">
            <NavLink
              className="bg-blue-500 text-white p-2 rounded-md font-semibold border-none
          transition-all hover:bg-blue-600
          "
              to="/signin"
            >
              SignIn
            </NavLink>
            <NavLink
              className="bg-blue-500 text-white p-2 rounded-md font-semibold border-none
          transition-all hover:bg-blue-600
          "
              to="/signup"
            >
              SignUp
            </NavLink>
          </div>
          )}
        </div>
      </div>
      <Outlet />

      {/* <CreatePost/> */}
    </>
  );
}

export default App;
