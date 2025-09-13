import React, { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

export default function QuestionForm({ 
  question = null, 
  onSubmit, 
  onCancel, 
  isEdit = false 
}) {
  const [formData, setFormData] = useState({
    title: question?.title || "",
    difficulty: question?.difficulty || "Easy",
    linkLeetCode: question?.linkLeetCode || "",
    linkYouTube: question?.linkYouTube || "",
    notes: question?.notes || ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    const questionData = {
      ...formData,
      title: formData.title.trim(),
      // Keep existing values for edit, set defaults for new
      isStarred: question?.isStarred || false,
      isSolved: question?.isSolved || false,
      createdAt: question?.createdAt || new Date().toISOString()
    };
    
    onSubmit(questionData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50 dark:bg-gray-700 mb-2">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Question Title */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Question Title *
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter question title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              autoFocus
              required
            />
          </div>
          
          {/* Difficulty Tag */}
          <div className="sm:w-32">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Difficulty
            </label>
            <select
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.difficulty}
              onChange={(e) => handleChange('difficulty', e.target.value)}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Links Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              LeetCode/Problem Link
            </label>
            <input
              type="url"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://leetcode.com/problems/..."
              value={formData.linkLeetCode}
              onChange={(e) => handleChange('linkLeetCode', e.target.value)}
            />
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              YouTube/Resource Link
            </label>
            <input
              type="url"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://youtube.com/watch?v=..."
              value={formData.linkYouTube}
              onChange={(e) => handleChange('linkYouTube', e.target.value)}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Notes
          </label>
          <textarea
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add your notes, approach, time complexity, etc..."
            rows={3}
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded transition-colors"
          >
            <FaTimes size={12} />
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
          >
            <FaSave size={12} />
            {isEdit ? 'Update' : 'Add'} Question
          </button>
        </div>
      </form>
    </div>
  );
}