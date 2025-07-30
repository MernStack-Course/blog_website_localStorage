import React, { useContext, useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/Auth";

function SignUp() {
  const { signUp, isLoading } = useAuthContext();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: [],
    email: [],
    password: [],
  });
  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required!"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("password is required"),
  });

  const handleChange = (fieldName, value) => {
    setData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(data, { abortEarly: false });
      signUp(data);
      toast.success("successfully signUp");
    } catch (validationErrors) {
      toast.error("an error occurred!");
      const newErrors = { username: [], email: [], password: [] };
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = [...newErrors[error.path], error.message];
      });
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="grid min-w-96 pt-10 pb-10 pr-3 pl-3 gap-3 border border-blue-300 rounded-sm">
          <h1 className="font-bold text-blue-500 text-2xl mb-7">
            SignUp in a new account
          </h1>
          <form onSubmit={handleSubmit}>
            <CustomInput
              type="text"
              label="Username"
              value={data.username}
              onChange={(value) => handleChange("username", value)}
            />
            {errors &&
              errors.username.map((error, index) => (
                <ul key={index} className="text-red-500">
                  {error}
                </ul>
              ))}
            <CustomInput
              type="text"
              label="Email"
              value={data.email}
              onChange={(value) => handleChange("email", value)}
            />
            {errors &&
              errors.email.map((error, index) => (
                <ul key={index} className="text-red-500">
                  {error}
                </ul>
              ))}
            <CustomInput
              type="password"
              label="Password"
              value={data.password}
              onChange={(value) => handleChange("password", value)}
            />
            {errors &&
              errors.password.map((error, index) => (
                <ul key={index} className="text-red-500">
                  {error}
                </ul>
              ))}
            <CustomButton
              onClick={handleSubmit}
              value="SignUp"
              type="submit"
              isLoading={isLoading}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
