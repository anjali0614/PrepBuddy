import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
export default function QuestionTitle({ title, isSolved, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [newVal, setNewVal] = useState(title);
  return editing ? (
    <form
      className="flex-1 inline"
      onSubmit={e => { e.preventDefault(); onEdit(newVal); setEditing(false); }}
    >
      <input
        className="border p-1 rounded min-w-[120px]"
        value={newVal}
        onChange={e => setNewVal(e.target.value)}
        autoFocus
        required
        onBlur={() => setEditing(false)}
      />
    </form>
  ) : (
    <span className={`flex-1 min-w-0 mr-2 ${isSolved ? " text-gray-400" : ""}`}>
      {title}
      <button
        className="ml-1 text-gray-500 hover:text-blue-600"
        onClick={() => { setNewVal(title); setEditing(true); }}
        title="Edit statement"
        type="button"
      >
        <FaEdit />
      </button>
    </span>
  );
}
