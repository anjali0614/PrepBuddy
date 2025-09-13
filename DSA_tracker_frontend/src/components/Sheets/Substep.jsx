import React, { useState } from "react";
import Question from "./Question";
import QuestionForm from "./Question/QuestionForm";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { useDispatch } from "react-redux";
import { updateSheet } from "../../features/sheets/sheetsSlice";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import ProgressBar from "../Navbar/ProgressBar";

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

export default function Substep({ substep, idx, stepIdx, sheet, sheetId, filters }) {
  const dispatch = useDispatch();

  // Name edit
  const [editing, setEditing] = useState(false);
  const [editingName, setEditingName] = useState(substep.name);

  // Add question 
  const [addingQ, setAddingQ] = useState(false);

  // Delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Rename
  const handleRename = async (e) => {
    e.preventDefault();
    if (!editingName.trim()) return;
    const updated = deepClone(sheet);
    updated.steps[stepIdx].substeps[idx].name = editingName.trim();
    await dispatch(updateSheet({ id: sheetId, data: updated }));
    setEditing(false);
  };

  // Delete substep
  const handleDelete = async () => {
    const updated = deepClone(sheet);
    updated.steps[stepIdx].substeps = updated.steps[stepIdx].substeps.filter((_, i) => i !== idx);
    await dispatch(updateSheet({ id: sheetId, data: updated }));
    setShowDeleteConfirm(false);
  };

  // Handler: Add Question
  const handleAddQuestion = async (questionData) => {
    const updated = deepClone(sheet);
    if (!updated.steps[stepIdx].substeps[idx].questions) {
      updated.steps[stepIdx].substeps[idx].questions = [];
    }
    
    const newQuestion = {
      title: questionData.title,
      difficulty: questionData.difficulty,
      linkLeetCode: questionData.linkLeetCode,
      linkYouTube: questionData.linkYouTube,
      notes: questionData.notes,
      isStarred: false,
      isSolved: false,
      createdAt: new Date().toISOString()
    };
    
    updated.steps[stepIdx].substeps[idx].questions.push(newQuestion);
    await dispatch(updateSheet({ id: sheetId, data: updated }));
    setAddingQ(false);
  };

  let filteredQuestions = (substep.questions || []);
  if (filters?.showStarred) filteredQuestions = filteredQuestions.filter(q => q.isStarred);
  if (filters?.showSolved !== null) filteredQuestions = filteredQuestions.filter(q => q.isSolved === filters.showSolved);
  if (filters?.difficultyFilter) { filteredQuestions = filteredQuestions.filter(q =>(q.difficulty || '').toLowerCase() === filters.difficultyFilter.toLowerCase());}

  const substepQuestions = substep.questions || [];
  const allQuestions = [...substepQuestions];
  const totalQuestions = allQuestions.length;
  const solvedQuestions = allQuestions.filter(q => q.isSolved).length;
  const percent = totalQuestions > 0 ? Math.round((solvedQuestions / totalQuestions) * 100) : 0;

  return (
    <>
      <div className="ml-4 my-3 p-4 bg-gray-50 dark:bg-gray-700 border-l-4 border-blue-200 rounded-3xl shadow-sm">
        {/* Name row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 flex-1">
            {editing ? (
              <form onSubmit={handleRename} className="flex items-center gap-3 flex-1">
                <input
                  className="border rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editingName}
                  onChange={e => setEditingName(e.target.value)}
                  autoFocus
                />
                <button className="text-green-600 px-3 py-1 rounded-md hover:bg-green-100" type="submit">Save</button>
                <button className="text-gray-500 px-3 py-1 rounded-md hover:bg-gray-100" type="button" onClick={() => { setEditing(false); setEditingName(substep.name); }}>Cancel</button>
              </form>
            ) : (
              <>
                <span className="font-semibold text-lg text-gray-700 dark:text-gray-300">{substep.name}</span>
                <button className="ml-2 text-blue-600 hover:text-blue-700 p-1 rounded-md hover:bg-blue-50" title="Edit Substep Name" onClick={() => { setEditing(true); setEditingName(substep.name); }}>
                  <FaEdit />
                </button>
              </>
            )}
          </div>
          <button 
            className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-md" 
            title="Delete Substep" 
            onClick={() => setShowDeleteConfirm(true)}
          >
            <FaTrash />
          </button>
        </div>

        {/* --- ProgressBar --- */}
        <div className="mb-3">
          <ProgressBar percent={percent} />
        </div>

        {/* Questions */}
        <div>
          {filteredQuestions.length === 0 && !addingQ && (
            <div className="text-gray-400 mb-3 text-sm">No questions yet.</div>
          )}
          {filteredQuestions.map((q, i) => (
            <Question
              key={q._id || i}
              question={q}
              parent={substep}
              qIdx={i}
              stepIdx={stepIdx}
              substepIdx={idx}
              sheet={sheet}
              sheetId={sheetId}
            />
          ))}
          
          {/* ADD QUESTION in substep */}
          {addingQ ? (
            <QuestionForm
              onSubmit={handleAddQuestion}
              onCancel={() => setAddingQ(false)}
              isEdit={false}
            />
          ) : (
            <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1 p-2 rounded-lg hover:bg-blue-50" onClick={() => setAddingQ(true)}>
              <FaPlus />
              Add Question
            </button>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Substep"
        message="This will permanently remove the substep and all its questions. This action cannot be undone."
        itemName={substep.name}
      />
    </>
  );
}