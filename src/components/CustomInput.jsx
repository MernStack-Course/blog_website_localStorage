import React from "react";

function CustomInput({ type, value, label, onChange, placeholder = '' }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <div className="flex flex-col gap-2">
      <label className="text-blue-500 grid justify-items-start" htmlFor="">
        {label}:{" "}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className="p-2 rounded-md border border-blue-300 focus:border-none focus:outline-blue-400"
        onChange={handleChange}
      />
    </div>
  );
}

export default CustomInput;
