import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../utils/apiClient";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfPwd, setShowConfPwd] = useState(false);
  const [newPwd, setNewPwd] = useState("");
  const [confPwd, setConfPwd] = useState("");

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("OTP sent to your email");
      setStep(2);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to send reset OTP"
      );
    }
    setLoading(false);
  };

  // Step 2: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPwd !== confPwd) {
      toast.error("Passwords do not match");
      return;
    }
    if (!/^[0-9]{6}$/.test(otp)) {
      toast.error("Enter a valid 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/reset-password", {
        email,
        otp,
        newPassword: newPwd
      });
      toast.success("Password reset! Please login.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000); 
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-md w-full">
      {step === 1 && (
        <form onSubmit={handleSendOtp} className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Forgot Password?</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Enter your email address and we'll send you an OTP to reset your password
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 
                       rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 
                       focus:ring-offset-2 focus:outline-none shadow-sm hover:shadow-md
                       transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 
                       disabled:cursor-not-allowed disabled:transform-none"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>

          <div className="text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline transition-colors"
            >
              <FaArrowLeft className="w-3 h-3 mr-2" />
              Back to Login
            </Link>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Enter OTP</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              We've sent a 6-digit code to <span className="font-medium">{email}</span>
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Verification Code
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500
                           text-center text-lg tracking-widest font-mono"
                type="text"
                pattern="[0-9]{6}"
                maxLength={6}
                placeholder="000000"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                  type={showPwd ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPwd}
                  onChange={e => setNewPwd(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  onClick={() => setShowPwd(s => !s)}
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
                             transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                  type={showConfPwd ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confPwd}
                  onChange={e => setConfPwd(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  onClick={() => setShowConfPwd(s => !s)}
                >
                  {showConfPwd ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 
                       rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 
                       focus:ring-offset-2 focus:outline-none shadow-sm hover:shadow-md
                       transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 
                       disabled:cursor-not-allowed disabled:transform-none"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline transition-colors"
            >
              <FaArrowLeft className="w-3 h-3 mr-2" />
              Back to Email
            </button>
          </div>
        </form>
      )}
      </div>
    </div>
  );
}