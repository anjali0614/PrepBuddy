
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaUpload } from "react-icons/fa";
import GoogleAuthButton from "./GoogleAuthButton";
export default function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [confPwd, setConfPwd]     = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [showPwd, setShowPwd]         = useState(false);
  const [showConfPwd, setShowConfPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confPwd || password !== confPwd) {
      toast.error("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    if (profilePic) formData.append("profilePic", profilePic);

    try {
      await dispatch(signup(formData)).unwrap();
      toast.success("Signed up. Please login to continue.");
      navigate("/login");
    } catch (e) {
      if (
        typeof e === "object" &&
        (e?.message?.toLowerCase().includes("exist") || e?.message?.toLowerCase().includes("already"))
      ) {
        toast.error("User already exists");
      } else if (e?.response?.data?.message?.toLowerCase().includes("exist")) {
        toast.error("User already exists");
      } else {
        toast.error(e?.message || "Signup failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-md w-full">
      <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Join us to get started</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                First Name
              </label>
              <input 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500
                           disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="First Name"
                value={firstName} 
                onChange={e => setFirstName(e.target.value)} 
                required 
                autoComplete="given-name"
                disabled={isLoading}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Last Name
              </label>
              <input 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500
                           disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Last Name"
                value={lastName} 
                onChange={e => setLastName(e.target.value)} 
                required 
                autoComplete="family-name"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input 
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500
                         disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your email"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              type="email" 
              required 
              autoComplete="email"
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input 
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500
                           disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Create a password"
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                type={showPwd ? "text" : "password"}
                required 
                minLength={6} 
                autoComplete="new-password"
                disabled={isLoading}
              />
              <button 
                type="button" 
                tabIndex={-1} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setShowPwd((v) => !v)}
                disabled={isLoading}
              >
                {showPwd ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input 
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500
                           disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Confirm your password"
                value={confPwd} 
                onChange={e => setConfPwd(e.target.value)} 
                type={showConfPwd ? "text" : "password"}
                required 
                minLength={6} 
                autoComplete="new-password"
                disabled={isLoading}
              />
              <button 
                type="button" 
                tabIndex={-1} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setShowConfPwd((v) => !v)}
                disabled={isLoading}
              >
                {showConfPwd ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profile Picture (Optional)
            </label>
            <div className="relative">
              <input 
                className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-xl 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-200 file:mr-4 file:py-1 file:px-3
                           file:rounded-full file:border-0 file:text-sm file:font-medium
                           file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
                           disabled:opacity-50 disabled:cursor-not-allowed"
                type="file" 
                accept="image/*"
                onChange={e => setProfilePic(e.target.files[0])}
                disabled={isLoading}
              />
              <FaUpload className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 ${isLoading ? 'opacity-50' : ''}`} />
            </div>
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 
                     rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 
                     focus:ring-offset-2 focus:outline-none shadow-sm hover:shadow-md
                     transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed
                     disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {isLoading && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>
        
        <GoogleAuthButton mode="signup" disabled={isLoading} />
      </form>
    </div>
  );
}