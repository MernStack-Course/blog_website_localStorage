import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ProtectedRoutes from "../pages/ProtectedRoutes";
import CreatePost from "../pages/CreatePost";
import { AuthProvider } from "../context/Auth";
import Post from "../pages/Post";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },{
        path:'/post',
        element: <Post/>
      },
      {
        path: "/createPost",
        element: (
          <AuthProvider>
            <ProtectedRoutes>
              <CreatePost />
            </ProtectedRoutes>
          </AuthProvider>
        ),
      },
    ],
  },
  {
    path: "/signin",
    element: (
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    ),
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: "*",
    element: <Home />,
  },

]);

export default router;
