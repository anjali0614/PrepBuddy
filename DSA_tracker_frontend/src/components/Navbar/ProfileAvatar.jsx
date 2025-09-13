import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileModal from "../Auth/ProfileModal";
import DeleteAccountModal from "../Auth/DeleteAccountModal";
import { logout } from "../../features/auth/authSlice";

export default function ProfileAvatar({ size = 20, className = "" }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  if (!user) return null;

  const initials =
    (user.firstName?.[0] || "").toUpperCase() +
    (user.lastName?.[0] || "").toUpperCase();

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
  };

  const handleUpdateProfile = () => {
    setShowProfileModal(true);
    setShowDropdown(false);
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
    setShowDropdown(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`flex items-center justify-center rounded-full border-2
          hover:ring-2 hover:ring-green-400 dark:hover:ring-green-500 transition-all duration-200
          ${className}
        `}
        style={{
          width: size,
          height: size,
          minWidth: size,
          minHeight: size,
          borderColor: "inherit",
        }}
      >
        {user.profileImage?.url ? (
          <img
            src={user.profileImage.url}
            className="w-full h-full object-cover rounded-full"
            alt="avatar"
            draggable={false}
          />
        ) : (
          <span className="w-full h-full flex items-center justify-center font-bold text-lg md:text-xl text-gray-700 dark:text-gray-100 select-none">
            {initials || "U"}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-[9999] animate-in fade-in-0 zoom-in-95">
          <button
            onClick={handleUpdateProfile}
            className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
          >
            
            <span className="font-medium">Update Profile</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
          >
           
            <span className="font-medium">Logout</span>
          </button>
          
          <div className="border-t border-gray-100 dark:border-gray-600 my-1"></div>
          
          <button
            onClick={handleDeleteAccount}
            className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
          >
          
            <span className="font-medium">Delete Account</span>
          </button>
        </div>
      )}

      {/* Modals */}
      {showProfileModal && (
        <ProfileModal 
          open={showProfileModal} 
          onClose={() => setShowProfileModal(false)} 
        />
      )}
      
      {showDeleteModal && (
        <DeleteAccountModal 
          open={showDeleteModal} 
          onClose={() => setShowDeleteModal(false)} 
        />
      )}
    </div>
  );
}