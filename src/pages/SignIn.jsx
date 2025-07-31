import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import * as yup from "yup";
import { useAuthContext } from "../context/Auth";

function SignIn() {
  const { signin, isLoading } = useAuthContext();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setError] = useState({ password: [], email: [] });

  const handleChange = (fieldName, value) => {
    setData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email is required!"),
    password: yup
      .string()
      .min(8)
      .matches(/[A-Z]/)
      .matches(/[a-z]/)
      .matches(/[0-9]/)
      .matches(/[!@#$%&*]/)
      .required("password is required!"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(data, { abortEarly: false });
      signin(data);
    } catch (validationErrors) {
      const newErrors = { password: [], email: [] };
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = [...newErrors[error.path], error.message];
      });
      setError(newErrors);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid min-w-96 pt-10 pb-10 pr-3 pl-3 gap-3 border border-blue-300 rounded-sm">
        <h1 className="font-bold text-center w-full text-blue-500 text-2xl mb-7">
          SignIn to your account
        </h1>
        <form onSubmit={handleSubmit}>
          <CustomInput
            type="text"
            label="Email"
            value={data.email}
            onChange={(value) => handleChange("email", value)}
          />
          {errors &&
            errors.email.map((er, index) => (
              <p className="text-red-500" key={index}>
                {er}
              </p>
            ))}
          <CustomInput
            type="password"
            label="Password"
            value={data.password}
            onChange={(value) => handleChange("password", value)}
          />
          {errors &&
            errors.password.map((er, index) => (
              <p className="text-red-500" key={index}>
                {er}
              </p>
            ))}
          <CustomButton
            value="SignIn"
            type="submit"
            onClick={handleSubmit}
            isLoading={isLoading}
          />
        </form>
      </div>
    </div>
  );
}

export default SignIn;
