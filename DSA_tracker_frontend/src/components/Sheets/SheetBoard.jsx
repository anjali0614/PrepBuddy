import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Step from "./Step";
import ProgressCircle from "./ProgressCircle";
import { FaRegFileAlt, FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";

export default function SheetBoard({ sheet, filters, onAddStep, onEditSheetTitle }) {
  const user = useSelector((state) => state.auth.user);

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(sheet?.title || "");
  const inputRef = useRef(null);

  useEffect(() => {
    setEditing(false);
    setTitle(sheet?.title || "");
  }, [sheet?._id, sheet?.title]);

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus();
  }, [editing]);

  if (!sheet)
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md mx-auto p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <FaRegFileAlt className="text-3xl text-blue-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No sheet selected
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Create a new sheet or select one from the sidebar to get started.
          </p>
        </div>
      </div>
    );

  const steps = sheet.steps || [];

  // Calculate stats to pass as props
  let totalQuestions = 0, solved = 0, starred = 0;
  if (sheet && sheet.steps) {
    sheet.steps.forEach((step) => {
      // Count directly in step
      (step.questions || []).forEach((q) => {
        totalQuestions++;
        if (q.isSolved) solved++;
        if (q.isStarred) starred++;
      });
      // Count in substeps
      (step.substeps || []).forEach((substep) => {
        (substep.questions || []).forEach((q) => {
          totalQuestions++;
          if (q.isSolved) solved++;
          if (q.isStarred) starred++;
        });
      });
    });
  }

  function handleRename(e) {
    e.preventDefault();
    if (title.trim() && title.trim() !== sheet.title && typeof onEditSheetTitle === "function") {
      onEditSheetTitle(sheet._id, title.trim());
    }
    setEditing(false);
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700  boarder rounded-3xl sticky  top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-2">
          {/* Welcome Message */}
          {user && (
            <div className="mb-1">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Welcome back, <span className="font-medium text-gray-900 dark:text-white">
                  {user.firstName || user.name || "User"}
                </span>
              </p>
            </div>
          )}

          {/* Title and Progress Row */}
          <div className="flex items-center justify-between">
            {/* Sheet Title */}
            <div className="flex items-center gap-3">
              {editing ? (
                <form onSubmit={handleRename} className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    className="text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-b-2 border-blue-500 outline-none px-1 py-1 min-w-0"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Escape") { setEditing(false); setTitle(sheet.title); }
                    }}
                    maxLength={64}
                    placeholder="Sheet title..."
                  />
                  <div className="flex items-center gap-1">
                    <button
                      type="submit"
                      className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                      title="Save"
                      disabled={!title.trim() || title.trim() === sheet.title}
                    >
                      <FaCheck className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Cancel"
                      onClick={() => { setEditing(false); setTitle(sheet.title); }}
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {sheet.title}
                  </h1>
                  <button
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="Edit sheet title"
                    onClick={() => setEditing(true)}
                    aria-label="Edit Sheet Name"
                  >
                    <FaPencilAlt className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Progress Circle */}
            <div className="flex-shrink-0">
              <ProgressCircle total={totalQuestions} solved={solved} starred={starred} />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        {steps.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Ready to start?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add your first step to begin organizing your work.
            </p>
            <button 
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
              onClick={onAddStep}
            >
              Add Your First Step
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <Step 
                key={step._id || idx} 
                step={step} 
                idx={idx} 
                sheet={sheet} 
                sheetId={sheet._id} 
                filters={filters} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      {steps.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button 
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            onClick={onAddStep}
          >
            <span className="text-lg font-semibold">+</span>
            <span className="hidden sm:inline">Add Step</span>
          </button>
        </div>
      )}
    </div>
  );
}