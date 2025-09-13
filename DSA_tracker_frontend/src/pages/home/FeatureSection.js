import React from "react";
import {
  FaStar, FaCheckCircle, FaPuzzlePiece,
  FaLock, FaCloud, FaTrophy
} from "react-icons/fa";

// Feature Card Component
function FeatureCard({ title, icon, description }) {
  return (
    <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 m-2 w-64 md:w-80 hover:shadow-blue-100 dark:hover:shadow-blue-900 transition-shadow">
      <div className="text-3xl text-blue-500 dark:text-blue-300 mb-3">{icon}</div>
      <div className="font-semibold text-lg mb-2 text-blue-900 dark:text-blue-100">{title}</div>
      <div className="text-gray-600 dark:text-gray-300">{description}</div>
    </div>
  );
}

// Features Section Component
export function FeaturesSection() {
  const features = [
    {
      icon: <FaStar />,
      title: "Personalized Sheets",
      description: "Organize problems your way. Sheets can be built, shared and followed—tailor your prep to your goals."
    },
    {
      icon: <FaCheckCircle />,
      title: "Track Your Progress",
      description: "Mark problems as solved or in progress. Your growth—visually mapped, motivating, and easy to analyze."
    },
    {
      icon: <FaPuzzlePiece />,
      title: "Practice Made Easy",
      description: "Direct links to LeetCode, GeeksforGeeks, and more. All resources in one intuitive dashboard."
    },
    {
      icon: <FaLock />,
      title: "Secure & Private",
      description: "All your sheets and progress are private by default. Your journey, your control."
    },
    {
      icon: <FaCloud />,
      title: "Access Anywhere",
      description: "Cloud-synced: pick up where you left off across devices, any time."
    },
    {
      icon: <FaTrophy />,
      title: "Celebrate Success",
      description: "Visualize documented steps and reward yourself as you advance!"
    }
  ];

  return (
    <section className="mt-16 md:mt-24 px-6 py-4 md:px-14 relative z-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-blue-800 dark:text-blue-200">
        Why You'll Love Our Platform
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}