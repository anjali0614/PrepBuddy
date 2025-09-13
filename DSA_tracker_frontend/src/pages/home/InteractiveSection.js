import React, { useState } from "react";
import { FaLightbulb, FaChartLine, FaPuzzlePiece, FaTrophy, FaCogs } from "react-icons/fa";

// Static Card Component
function StaticCard({ title, icon }) {
  return (
    <div className="rounded-2xl shadow-xl flex flex-col items-center justify-center py-6 px-4 m-2 w-40 h-40 md:w-44 md:h-44 text-lg bg-white/90 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
      <div className="text-4xl mb-2 text-blue-500 dark:text-blue-300">{icon}</div>
      <div className="font-bold mb-1 text-blue-800 dark:text-blue-200">{title}</div>
    </div>
  );
}

// Morph Card Component
function MorphCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        rounded-2xl shadow-xl flex flex-col items-center justify-center
        py-6 px-4 m-2 w-56 h-56 md:w-64 md:h-64 text-2xl
        bg-white dark:bg-gray-900
        border-4 ${isHovered ? "border-yellow-400" : "border-blue-400"}
        transition-all duration-300 cursor-pointer
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center">
        <span className={`text-5xl mb-3 transition-colors duration-300 ${isHovered ? "text-yellow-500" : "text-blue-500 dark:text-blue-300"}`}>
          {isHovered ? <FaTrophy /> : <FaCogs />}
        </span>
        <span className={`font-bold mb-1 text-2xl transition-colors duration-300 ${isHovered ? "text-yellow-600 dark:text-yellow-500" : "text-blue-800 dark:text-blue-200"}`}>
          {isHovered ? "Success" : "Prep buddy"}
        </span>
        <div className="text-base font-light text-gray-500 dark:text-gray-400 mt-1 text-center">
          {isHovered ? "Celebrate wins!" : (
            <>
              Explore, learn, and upskill.
              <br className="hidden md:inline" /> Your journey starts here!
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Interactive Section Component
export function InteractiveSection() {
  const stepCards = [
    { title: "Plan", icon: <FaLightbulb /> },
    { title: "Practice", icon: <FaPuzzlePiece /> },
    { title: "Progress", icon: <FaChartLine /> }
  ];

  return (
    <section className="relative mt-10 flex flex-col items-center z-10 px-2">
      <div className="w-full flex flex-col items-center relative">
        {/* Static 3 cards row */}
        <div className="relative flex flex-row items-center justify-center gap-4 z-20 mb-14">
          {stepCards.map((card) => (
            <StaticCard
              key={card.title}
              title={card.title}
              icon={card.icon}
            />
          ))}
        </div>
        
        {/* Morph card */}
        <div className="relative flex flex-col items-center z-30">
          <MorphCard />
        </div>
      </div>
    </section>
  );
}