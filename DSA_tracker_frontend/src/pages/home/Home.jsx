import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { InteractiveSection } from "./InteractiveSection";
import { FeaturesSection } from "./FeatureSection";

// Hero Section Component
function HeroSection({ isLoggedIn, onGetStarted }) {
  return (
    <section className="text-center pt-16 px-4 md:pt-24 relative z-10">
      <h1 className="text-4xl md:text-6xl font-extrabold text-blue-700 dark:text-blue-200 mb-4 drop-shadow-lg">
        Welcome to Prep Buddy
      </h1>
      <p className="mb-6 md:mb-10 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg text-center mx-auto">
        Your hub to track, solve, and master your skills.
      </p>
      {!isLoggedIn && (
        <button
          onClick={onGetStarted}
          className="mt-2 px-8 py-3 rounded-xl bg-blue-600 dark:bg-blue-500 text-white font-bold text-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-600 transition"
        >
          Get Started
        </button>
      )}
    </section>
  );
}

// Main Home Component
export default function Home() {
  const isLoggedIn = !!useSelector(state => state.auth.user);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <HeroSection isLoggedIn={isLoggedIn} onGetStarted={handleGetStarted} />
      <InteractiveSection />
      <FeaturesSection />
      
      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            Crafted with ❤️ by <span className="font-semibold text-blue-600 dark:text-blue-400">Anjali Mina</span>
          </p>
          <p className="text-xs mt-1">
            Contact: <a href="mailto:prepbuddy1.oo@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">prepbuddy1.oo@gmail.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}