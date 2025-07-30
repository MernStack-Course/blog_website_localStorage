import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => {
    return !!localStorage.getItem("token");
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signin = (data) => {
    setIsLoading(true);
    if (!data.email || !data.password) {
      toast("all field are required!");
      return;
    }
    const checkUserEmailPassword = (data) => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existCheck = users.find((user) => {
        if (user.email === data.email && user.password === data.password) {
          localStorage.setItem("user", JSON.stringify(user));
          return user.email === data.email && user.password === data.password;
        }
      });
      if (existCheck) {
        return true;
      } else {
        return false;
      }
    };
    if (checkUserEmailPassword(data)) {
      setIsLoading(true);
      const randChar = Math.random()
        .toString(20)
        .substring(2, 3 + 50);
      localStorage.setItem("token", randChar);
      setIsAuth(true);
      toast("successfully signin");
      setIsLoading(false);
      navigate("/");
    } else {
      alert("incorrect email or password!");
      setIsLoading(false);
      setIsAuth(false);
    }
  };

  const checkUserEmail = (email) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existCheck = users.find((user) => user.email === email);
    if (existCheck) {
      return true;
    } else {
      return false;
    }
  };
  const signUp = async (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    setIsLoading(true);
    if (!data.username || !data.email || !data.password) {
      toast.error("all field is required");
      return;
    }
    try {
      const check = checkUserEmail(data.email);
      if (check) {
        alert("this account is already exist!");
        navigate("/signin");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const newUser = {
        id: users.length + 1,
        username: data.username,
        email: data.email,
        password: data.password,
      };
      users.push(newUser);
      console.log(users);
      if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify([]));
      }
      localStorage.setItem("users", JSON.stringify(users));
      setIsLoading(false);
      toast.success("your account successfully created!");
      navigate("/signin");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const signOut = () => {
    if (isAuth) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoading(false);
      setIsAuth(false);
      navigate("/");
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        signUp,
        signin,
        signOut,
        isAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => {
  return useContext(AuthContext);
};
