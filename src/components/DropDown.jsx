"use client";

import React from "react";

export default function DropDown({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  required = false,
}) {
  return (
    <div className="relative flex flex-col gap-1 mt-0">
      {label && (
        <label htmlFor={name} className="font-medium text-sm mt-0">
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full appearance-none px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700">
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Custom arrow */}
      <div className="pointer-events-none absolute right-4 top-[53%] -translate-y-1/2 text-gray-500">
        ▼
      </div>
    </div>
  );
}
