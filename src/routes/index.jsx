import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ProtectedRoutes from "../pages/ProtectedRoutes";
import CreatePost from "../pages/CreatePost";
import { AuthProvider } from "../context/Auth";

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
    path: "*",
    element: <Home />,
  },
]);

export default router;
