import React from "react";
export default function ProgressBar({ percent }) {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-3 my-2">
      <div
        className="bg-blue-500 h-3 rounded transition-all duration-300"
        style={{ width: Math.max(0, Math.min(percent, 100)) + "%" }}
      />
    </div>
  );
}
