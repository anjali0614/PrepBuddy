import React, { useState } from "react";
import { FaEdit, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

function safeUrl(url) {
  if (!url) return "";
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return "https://" + trimmed;
}
export default function QuestionSolveLink({ link, onSetLink }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(link || "");

  const handleNoLink = () => {
    toast.info("No solve link added. Please add link.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSetLink(val.trim());
    setEditing(false);
  };

  return (
    <div className="mx-2 flex items-center">
      {editing ? (
        <form className="flex gap-1" onSubmit={handleSubmit}>
          <input
            className="border p-1 rounded w-36"
            value={val}
            placeholder="Paste solve link"
            onChange={e => setVal(e.target.value)}
            autoFocus
          />
          <button className="text-green-600" type="submit"><FaCheck /></button>
        </form>
      ) : (
        <>
          {link ? (
            <>
              <a
                href={safeUrl(link)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-600 mr-1 text-xs"
              >
                Solve
              </a>
              <button
                onClick={() => { setEditing(true); setVal(link || ""); }}
               
                
                className="text-gray-500 hover:text-blue-600"
                title="Edit solve link"
              >
                <FaEdit />
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-blue-100 text-blue-600 px-2 py-1 border border-blue-200 rounded text-xs mr-1 hover:bg-blue-200"
                 onClick={handleNoLink}
              >
                Solve
              </button>
              <button
                onClick={() => { setEditing(true); setVal(""); }}
                className="text-gray-500 hover:text-blue-600"
                title="Add solve link"
              >
                <FaEdit />
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
