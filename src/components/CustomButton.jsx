import React from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { RiLoader3Fill, RiLoader4Line, RiLoader5Fill } from "react-icons/ri";

function CustomButton({ value, isLoading, type, onClick }) {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className="flex justify-center border-none outline-0 w-full bg-blue-400 text-white rounded-sm p-2 mt-7
        font-semibold hover:-translate-y-1 transition-all duration-300 hover:bg-blue-500 
        "
      >
        {isLoading ? <RiLoader3Fill className="animate-spin" /> : value}
      </button>
    </div>
  );
}

export default CustomButton;
