import React from "react";
import { FaTrash } from "react-icons/fa";
export default function QuestionDeleteButton({ onDelete }) {
  return (
    <button className="ml-auto text-red-500 hover:text-red-700" onClick={onDelete} title="Delete question">
      <FaTrash />
    </button>
  );
}
