import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function ProgressCircle({ total, solved, starred }) {
  const [hovered, setHovered] = useState(false);
  const percent = total ? (solved / total) * 100 : 0;

  const radius = 40;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = Math.round(percent * circumference / 100);

  return (
    <div
      className="flex items-center justify-center w-20 h-20 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Sheet Progress"
    >
      <div className="relative flex items-center justify-center">
        <svg width={radius * 2} height={radius * 2} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            stroke="#F3F4F6"
            strokeWidth={stroke}
            className="dark:stroke-gray-600"
          />
          {/* Progress circle */}
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            stroke="#3B82F6"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {!hovered ? (
            <div className="space-y-0.5">
              <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                {total}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                total
              </div>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  ✓{solved}
                </span>
                <span className="flex items-center gap-0.5 text-xs text-yellow-500 dark:text-yellow-400 font-medium">
                  <FaStar className="w-2.5 h-2.5" />
                  {starred}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-0.5">
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {Math.round(percent)}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                complete
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}