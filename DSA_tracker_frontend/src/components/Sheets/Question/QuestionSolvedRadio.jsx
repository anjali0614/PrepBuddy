import React from "react";
export default function QuestionSolvedRadio({ solved, onToggle }) {
  return (
    <button
      className="mr-3 flex items-center justify-center rounded-full border w-5 h-5 focus:outline-none border-gray-300 bg-white dark:bg-gray-700"
      title={solved ? "Unsolve" : "Mark as solved"}
      onClick={onToggle}
    >
      {solved ? (
        <span className="inline-block w-3 h-3 bg-green-400 rounded-full"></span>
      ) : (
        <span className="inline-block w-3 h-3"></span>
      )}
    </button>
  );
}
