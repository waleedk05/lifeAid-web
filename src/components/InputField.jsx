"use client";

import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";
import Image from "next/image";

export default function InputField({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  icon, // optional icon on the left
  secureTextEntry = false,
  required = false,
  min,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = secureTextEntry || type === "password";

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div
      className="flex items-center w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-100 shadow-md relative focus-within:ring-1 focus-within:ring-red-500 mt-0">
      {icon && (
        <div className="mr-3">
          <Image src={icon} alt="icon" width={20} height={20} />
        </div>
      )}

      <input
        type={isPassword && !isPasswordVisible ? "password" : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className="flex-1 bg-transparent focus:outline-none text-[16px] placeholder-gray-500"
      />

      {isPassword && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="ml-2 text-gray-600 hover:text-red-600">
          {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
}
