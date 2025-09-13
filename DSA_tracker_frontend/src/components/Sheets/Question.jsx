import React, { useState } from "react";
import QuestionSolvedRadio from "./Question/QuestionSolvedRadio";
import QuestionSolveLink from "./Question/QuestionSolveLink";
import QuestionResourceLink from "./Question/QuestionResourceLink";
import QuestionStar from "./Question/QuestionStar";
import QuestionNotes from "./Question/QuestionNotes";
import QuestionForm from "./Question/QuestionForm";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { useDispatch } from "react-redux";
import { updateSheet } from "../../features/sheets/sheetsSlice";
import { FaEdit, FaTrash } from "react-icons/fa";

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

export default function Question({
  question,
  parent,
  qIdx,
  stepIdx,
  substepIdx,
  sheet,
  sheetId,
}) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function getQCopy(updated) {
    if (substepIdx != null)
      return updated.steps[stepIdx].substeps[substepIdx].questions[qIdx];
    return updated.steps[stepIdx].questions[qIdx];
  }
   
  const handleToggleSolved = async () => {
    const updated = deepClone(sheet);
    getQCopy(updated).isSolved = !getQCopy(updated).isSolved;
    await dispatch(updateSheet({ id: sheetId, data: updated }));
  };

  const handleSetSolveLink = async (link) => {
    const updated = deepClone(sheet);
    getQCopy(updated).linkLeetCode = link;
    await dispatch(updateSheet({ id: sheetId, data: updated }));
  };

  const handleSetResourceLink = async (link) => {
    const updated = deepClone(sheet);
    getQCopy(updated).linkYouTube = link;
    await dispatch(updateSheet({ id: sheetId, data: updated }));
  };

  const handleSetNotes = async (notes) => {
    const updated = deepClone(sheet);
    getQCopy(updated).notes = notes;
    await dispatch(updateSheet({ id: sheetId, data: updated }));
  };

  const handleStar = async () => {
    const updated = deepClone(sheet);
    getQCopy(updated).isStarred = !getQCopy(updated).isStarred;
    await dispatch(updateSheet({ id: sheetId, data: updated }));
  };

  const handleFormSubmit = async (questionData) => {
    const updated = deepClone(sheet);
    const qCopy = getQCopy(updated);
    
    // Update only the fields from form
    qCopy.title = questionData.title;
    qCopy.difficulty = questionData.difficulty;
    qCopy.linkLeetCode = questionData.linkLeetCode;
    qCopy.linkYouTube = questionData.linkYouTube;
    qCopy.notes = questionData.notes;
    
    await dispatch(updateSheet({ id: sheetId, data: updated }));
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const updated = deepClone(sheet);
    if (substepIdx != null) {
      updated.steps[stepIdx].substeps[substepIdx].questions =
        updated.steps[stepIdx].substeps[substepIdx].questions.filter((_, i) => i !== qIdx);
    } else {
      updated.steps[stepIdx].questions = updated.steps[stepIdx].questions.filter((_, i) => i !== qIdx);
    }
    await dispatch(updateSheet({ id: sheetId, data: updated }));
    setShowDeleteConfirm(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isEditing) {
    return (
      <QuestionForm
        question={question}
        onSubmit={handleFormSubmit}
        onCancel={() => setIsEditing(false)}
        isEdit={true}
      />
    );
  }

  return (
    <>
      <div className="py-2 pl-3 border-b border-gray-200 dark:border-gray-600">
        {/* Main Question Row  */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Left Side - Radio, Title, Tag */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <QuestionSolvedRadio 
              solved={question.isSolved} 
              onToggle={handleToggleSolved} 
            />
            
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span 
                  className={`font-medium break-words ${
                    question.isSolved ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {question.title}
                </span>
                <span 
                  className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getDifficultyColor(question.difficulty)}`}
                >
                  {question.difficulty || 'Easy'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="flex overflow-auto items-center gap-1 sm:gap-2 flex-shrink-0 ml-8 sm:ml-0">
            <QuestionSolveLink 
              link={question.linkLeetCode} 
              onSetLink={handleSetSolveLink} 
            />
            <QuestionResourceLink 
              link={question.linkYouTube} 
              onSetLink={handleSetResourceLink} 
            />
            <QuestionNotes 
              notes={question.notes} 
              title={question.title} 
              onSetNotes={handleSetNotes} 
            />
            <QuestionStar 
              isStarred={question.isStarred} 
              onStar={handleStar} 
            />
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
              title="Edit Question"
            >
              <FaEdit size={12} className="sm:w-3.5 sm:h-3.5" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-1.5 sm:p-2 text-red-500 hover:bg-red-100 rounded transition-colors"
              title="Delete Question"
            >
              <FaTrash size={12} className="sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Question"
        message="This action cannot be undone."
        itemName={question.title}
      />
    </>
  );
}