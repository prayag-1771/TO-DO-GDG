import React from "react";

export default function ToggleButton({ checked, ...props }) {
  const textClass = checked ? "text-white" : "text-black";
  const labelText = checked ? "Dark" : "Light";

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input {...props} type="checkbox" checked={checked} className="sr-only peer" />
      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
      <span className={`ml-3 text-sm font-medium ${textClass}`}>
        {labelText}
      </span>
    </label>
  );
}
