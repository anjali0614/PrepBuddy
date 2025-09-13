import React, { useState } from "react";
import Substep from "./Substep";
import Question from "./Question";
import QuestionForm from "./Question/QuestionForm";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { useDispatch } from "react-redux";
import { updateSheet } from "../../features/sheets/sheetsSlice";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import ProgressBar from "../Navbar/ProgressBar";


function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

export default function Step({ step, idx, sheet, sheetId, filters }) {
  const dispatch = useDispatch();
  // --- Name editing 
  const [editing, setEditing] = useState(false);
  const [editingName, setEditingName] = useState(step.name);

  // --- Substep creation 
  const [addingSub, setAddingSub] = useState(false);
  const [newSubName, setNewSubName] = useState("");

  // --- Question creation  
  const [addingQ, setAddingQ] = useState(false);

  // --- Delete confirmation 
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Handler: Rename Step
  const handleRename = async (e) => {
    e.preventDefault();
    if (!editingName.trim()) return;
    const updated = deepClone(sheet);
    updated.steps[idx].name = editingName.trim();
    await dispatch(updateSheet({ id: sheetId, data: updated }));
    setEditing(false);
  };

  // Handler: Delete Step
  const handleDeleteStep = async () => {
    const updated = deepClone(sheet);
    updated.steps = updated.steps.filter((_, i) => i !== idx);
    await dispatch(updateSheet({ id: sheetId, data: updated }));
    setShowDeleteConfirm(false);
  };

  // Handler: Add Substep
  const handleAddSub = async (e) => {
    e.preventDefault();
    if (!newSubName.trim()) return;
    const updated = deepClone(sheet);
    if (!updated.steps[idx].substeps) updated.steps[idx].substeps = [];
    updated.steps[idx].substeps.push({ name: newSubName.trim(), questions: [] });
    await dispatch(updateSheet({ id: sheetId, data: updated }));
    setAddingSub(false);
    setNewSubName("");
  };

  // Handler: Add Question 
  const handleAddQuestion = async (questionData) => {
    const updated = deepClone(sheet);
    if (!updated.steps[idx].questions) updated.steps[idx].questions = [];
    
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
    
    updated.steps[idx].questions.push(newQuestion);
    await dispatch(updateSheet({ id: sheetId, data: updated }));
    setAddingQ(false);
  };

  const substeps = step.substeps || [];
  let filteredQuestions = step.questions || [];
  if (filters?.showStarred) filteredQuestions = filteredQuestions.filter(q => q.isStarred);
  if (filters?.showSolved !== null) filteredQuestions = filteredQuestions.filter(q => q.isSolved === filters.showSolved);
  if (filters?.difficultyFilter) { filteredQuestions = filteredQuestions.filter(q =>(q.difficulty || '').toLowerCase() === filters.difficultyFilter.toLowerCase() ); }

  // --- PROGRESS BAR LOGIC ---
  const stepQuestions = step.questions || [];
  const allSubstepQuestions = substeps.flatMap(s => s.questions || []);
  const allQuestions = [...stepQuestions, ...allSubstepQuestions];
  const totalQuestions = allQuestions.length;
  const solvedQuestions = allQuestions.filter(q => q.isSolved).length;
  const percent = totalQuestions > 0 ? Math.round((solvedQuestions / totalQuestions) * 100) : 0;

  return (
    <>
      <div className="mb-6 p-6 bg-white dark:bg-gray-800 border rounded-3xl shadow-md">
        
        {/* --- Step Name --- */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 flex-1">
            {editing ? (
              <form onSubmit={handleRename} className="flex items-center gap-3 flex-1">
                <input
                  className="border rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editingName}
                  autoFocus
                  onChange={e => setEditingName(e.target.value)}
                />
                <button className="text-green-600 px-3 py-1 rounded-md hover:bg-green-50" type="submit" title="Save">
                  Save
                </button>
                <button className="text-gray-500 px-3 py-1 rounded-md hover:bg-gray-50" type="button" onClick={() => { setEditing(false); setEditingName(step.name); }}>Cancel</button>
              </form>
            ) : (
              <>
                <span className="font-bold text-xl text-gray-800 dark:text-gray-200">{step.name}</span>
                <button
                  className="ml-2 text-blue-600 hover:text-blue-700 p-1 rounded-md hover:bg-blue-50"
                  title="Edit Step Name"
                  onClick={() => { setEditing(true); setEditingName(step.name); }}
                >
                  <FaEdit />
                </button>
              </>
            )}
          </div>
          <button
            className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-md"
            title="Delete Step"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <FaTrash />
          </button>
        </div>
        
        {/* --- ProgressBar --- */}
        <div className="mb-4">
          <ProgressBar percent={percent} />
        </div>

        {/* --- Substeps list --- */}
        <div className="mb-4">
          {substeps.length === 0 && (
            <div className="text-gray-400 mb-3 text-sm">No substeps yet.</div>
          )}
          {substeps.map((sub, subi) => (
            <Substep
              key={sub._id || subi}
              substep={sub}
              parent={step}
              idx={subi}
              stepIdx={idx}
              sheet={sheet}
              sheetId={sheet._id}
              filters={filters}
            />
          ))}
          {/* ADD SUBSTEP  */}
          {addingSub ? (
            <form className="flex gap-3 my-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg" onSubmit={handleAddSub}>
              <input
                className="border rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Substep name"
                value={newSubName}
                onChange={e => setNewSubName(e.target.value)}
                autoFocus
                required
              />
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" type="submit">Add</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300" type="button" onClick={() => { setAddingSub(false); setNewSubName(""); }}>Cancel</button>
            </form>
          ) : (
            <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1 p-2 rounded-lg hover:bg-blue-50" onClick={() => setAddingSub(true)}>
              <FaPlus />
              Add Substep
            </button>
          )}
        </div>

        {/* --- Questions --- */}
        <div>
          {filteredQuestions.length === 0 && !addingQ && (
            <div className="text-gray-400 mb-3 text-sm">No questions yet.</div>
          )}
          {filteredQuestions.map((q, i) => (
            <Question
              key={q._id || i}
              question={q}
              parent={step}
              qIdx={i}
              stepIdx={idx}
              substepIdx={null}
              sheet={sheet}
              sheetId={sheet._id}
            />
          ))}
          
          {/* ADD QUESTION direclty in step */}
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
        onConfirm={handleDeleteStep}
        title="Delete Step"
        message="This will permanently remove the step and all its substeps and questions. This action cannot be undone."
        itemName={step.name}
      />
    </>
  );
}