import React, {useState} from "react";
import { FaEdit, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

function safeUrl(url) {
  if (!url) return "";
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return "https://" + trimmed;
}

export default function QuestionResourceLink({ link, onSetLink }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(link || "");

 
  const handleNoLink = () => {
     toast.info("No resource link added. Please add link.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSetLink(val.trim());
    setEditing(false);
  };

  return (
    <div className="mx-2 flex items-center">
      {editing ? (
        <form className="flex items-center" onSubmit={handleSubmit}>
          <input
            className="border p-1 rounded w-36"
            value={val}
            placeholder="Paste resource link (ex: www.example.com)"
            onChange={e => setVal(e.target.value)}
            autoFocus
          />
          <button className="text-green-600 ml-1" type="submit" title="Set resource">
            <FaCheck />
          </button>
        </form>
      ) : (
        <>
          {link ? (
            <a
              href={safeUrl(link)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-500 text-white rounded px-2 py-1 hover:bg-purple-600 mr-1 text-xs"
              title="Open resource"
            >
              Resource
            </a>
          ) : (
            <button
              type="button"
              className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200 rounded px-2 py-1 mr-1 text-xs"
              onClick={handleNoLink}
            >
              Resource
            </button>
          )}
          <button
            type="button"
            className="text-gray-500 hover:text-purple-600"
            onClick={() => { setEditing(true); setVal(link || ""); }}
            title="Edit resource link"
          >
            <FaEdit />
          </button>
        </>
      )}
    </div>
  );
}
