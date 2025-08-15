"use client";

import React from "react";
import clsx from "clsx";

export default function Button({
  title,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  className = "",
  variant = "primary",
}) {
  const baseStyles =
    "w-full rounded-xl px-4 py-3 font-semibold text-white shadow-md transition duration-200 ease-in-out mt-10 flex justify-center items-center gap-2";

  const variants = {
    primary: "bg-red-700 hover:bg-red-800",
    secondary: "bg-gray-600 hover:bg-gray-700",
    danger: "bg-red-500 hover:bg-red-600",
  };

  const disabledStyles = "bg-gray-300 text-gray-500 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        baseStyles,
        disabled || loading ? disabledStyles : variants[variant],
        className
      )}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      )}
      {title}
    </button>
  );
}
