import { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function CustomInput({ type, value, label, onChange, placeholder = "" }) {

  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  useEffect(() => {
    setInputType(type);
  }, [type]);
  const togglePassword = () => {
    const newType = inputType === "password" ? "text" : "password";
    setShowPassword(!showPassword);
    setInputType(newType);
  };
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <div className="flex flex-col gap-2">
      <label className="text-blue-500 grid justify-items-start" htmlFor="">
        {label}:{" "}
      </label>
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          className="w-full p-2 rounded-md border border-blue-300 focus:border-none focus:outline-blue-400"
          onChange={handleChange}
        />
        {label === "Password" ? (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute top-3 right-2 "
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CustomInput;
