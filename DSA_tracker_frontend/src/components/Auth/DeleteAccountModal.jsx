import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function DeleteAccountModal({ open, onClose }) {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [confirmText, setConfirmText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (!open) return null;

  const handleDeleteAccount = async () => {
    if (confirmText !== "DELETE") {
      toast.error("Please type 'DELETE' to confirm");
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(deleteAccount()).unwrap();
      toast.success("Account deleted successfully");
      setIsLoading(false);
      onClose();
      navigate("/login");
    } catch (err) {
      toast.error("Failed to delete account");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" style={{ minHeight: '100vh', minWidth: '100vw' }}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-red-200 dark:border-red-800 overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl">⚠️</div>
            <h2 className="text-xl font-semibold text-red-900 dark:text-red-100">
              Delete Account
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-100 dark:hover:bg-red-800/30 rounded-xl transition-colors"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
              <div>⚠️</div>
              <div className="space-y-2">
                <h3 className="font-semibold text-red-900 dark:text-red-100">
                  This action cannot be undone
                </h3>
                <p className="text-sm text-red-700 dark:text-red-200">
                  Deleting your account will permanently remove all your data, including:
                </p>
                <ul className="text-sm text-red-700 dark:text-red-200 space-y-1 ml-4">
                  <li>• Your profile information</li>
                  <li>• All your posts and comments</li>
                  <li>• Your account history</li>
                  <li>• Any saved preferences</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">{user?.firstName} {user?.lastName}</span>, 
                we're sorry to see you go. Once you delete your account, there's no going back.
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type <span className="font-bold text-red-600">DELETE</span> to confirm:
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-red-300 dark:border-red-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  value={confirmText}
                  onChange={e => setConfirmText(e.target.value)}
                  placeholder="Type DELETE here"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleDeleteAccount}
              disabled={confirmText !== "DELETE" || isLoading}
              className={`flex-1 font-medium py-3 px-4 rounded-xl focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 ${confirmText === "DELETE" && !isLoading ? "bg-red-600 hover:bg-red-700 text-white" : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                <>Delete Account</>
              )}
            </button>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-4 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}