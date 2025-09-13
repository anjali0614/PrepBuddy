import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./utils/ProtectedRoute";
import { setTheme } from "./utils/theme";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    setTheme(localStorage.getItem("dsa_theme") || "light");
  }, []);

 
  const isLoggedIn = !!localStorage.getItem("token");
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}
