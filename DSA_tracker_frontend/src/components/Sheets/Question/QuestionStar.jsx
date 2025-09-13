import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
export default function QuestionStar({ isStarred, onStar }) {
  return (
    <button className="mx-2" onClick={onStar} title="Mark as important">
      {isStarred ? <FaStar className="text-yellow-400" /> : <FaRegStar className="text-gray-400" />}
    </button>
  );
}
