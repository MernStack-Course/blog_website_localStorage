import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

// const initialDataLocalStorage = [
//     {
//         id:1,
//         username: 'Qasem',
//         email:"qasimmohammadi520@gmail.com",
//         password: '1234'
//     }
// ];
// localStorage.setItem('users', JSON.stringify(initialDataLocalStorage));
export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signUp = async (data) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
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
        return;
      }
      const newUser = {
        id: users.length +1,
        username: data.username,
        email: data.email,
        password: data.password
      };
      users.push(newUser);
      console.log(users);
      if(!localStorage.getItem('users')){
        localStorage.setItem('users', JSON.stringify([]))
      }
      localStorage.setItem('users', JSON.stringify(users)); 
      setIsLoading(false);
      toast.success("your account successfully created!");
      navigate("/signin");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const checkUserEmail = (email) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existCheck = users.find(user => user.email === email);
    if(existCheck){
        return true;
    }else{
        return false;
    }

  };

  const signin = (data) => {
    setIsLoading(true);
    if(!data.email || !data.password){
        toast('all field are required!');
        alert("all field required!");
        return;
    }
    const checkUser = checkUserEmail(data.email);
    if(checkUser){
        setIsAuth(true) ;
        toast.success('successfully signin');
        setIsLoading(false);
        navigate('/');
    }
    else{
        alert('incorrect email or password!');
        setIsLoading(false);
        setIsAuth(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isLoading,
        signUp,
        signin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
