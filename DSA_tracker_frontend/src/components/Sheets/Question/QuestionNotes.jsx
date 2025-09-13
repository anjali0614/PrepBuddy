import React, { useState } from "react";
import { FaStickyNote } from "react-icons/fa";
import NotesModal from "./NotesModel";

export default function QuestionNotes({ notes, title, onSetNotes }) {
  const [show, setShow] = useState(false);
   const hasNotes = !!(notes && notes.trim());
  return (
    <>
      <button className={`mx-2 ${hasNotes ? "text-lime-400" : "text-gray-600"} hover:text-blue-600`} onClick={() => setShow(true)} title="Add/edit notes">
        <FaStickyNote />
      </button>
      {show && (
        <NotesModal
          open={show}
          onClose={() => setShow(false)}
          question={{ title, notes }}
          setQuestion={onSetNotes}
        />
      )}
    </>
  );
} 
