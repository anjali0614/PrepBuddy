import React, { useState } from "react";







export default function NotesModal({ open, onClose, question, setQuestion }) {
    const [notes, setNotes] = useState(question.notes || "");
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="w-[340px] bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col">
        <span className="mb-2 font-bold">
          Notes for: {question.title}
        </span>
        <textarea
          className="h-24 border rounded p-2"
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded"
            onClick={() => {
              setQuestion(notes); 
              onClose();
            }}
          >
            Save
          </button>
          <button
            className="px-3 py-1 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
