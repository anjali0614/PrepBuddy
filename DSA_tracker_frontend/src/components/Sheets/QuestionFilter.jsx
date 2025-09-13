import React from "react";
import { FaStar } from "react-icons/fa";
import classNames from "classnames";

export default function QuestionFilter({
  showStarred, setShowStarred,
  showSolved, setShowSolved,
  difficultyFilter, setDifficultyFilter,
  onClear
}) 
{
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* First row: Starred, Solved, Unsolved */}
      <div className="flex gap-2 w-full justify-center">
        <button
          type="button"
          className={classNames(
            "flex items-center gap-1 px-2 py-1 text-xs sm:text-sm font-semibold rounded-full transition",
            showStarred ? "bg-[#DDE2F1] text-[#3659E3] dark:bg-[#1a2237] dark:text-[#7EA2FF]"
              : "bg-[#F5F8FE] text-[#667094] dark:bg-[#1A2132] dark:text-[#8D96B2]",
            "hover:bg-[#E5EAFA] dark:hover:bg-[#23263a]")} 
            onClick={() => setShowStarred(s => !s)} >

          <FaStar className={showStarred ? "text-yellow-400" : "text-gray-300"} />
          Starred
        </button>

        <button
          type="button"
          className={classNames(
            "px-2 py-1 text-xs sm:text-sm font-semibold rounded-full transition",
            showSolved === true ? "bg-[#DDE2F1] text-[#3659E3] dark:bg-[#1a2237] dark:text-[#7EA2FF]"
              : "bg-[#F5F8FE] text-[#667094] dark:bg-[#1A2132] dark:text-[#8D96B2]",
            "hover:bg-[#E5EAFA] dark:hover:bg-[#23263a]"
          )}
          onClick={() => setShowSolved(prev => prev === true ? null : true)}
          >
          Solved
        </button>
        <button
          type="button"
          className={classNames(
            "px-2 py-1 text-xs sm:text-sm font-semibold rounded-full transition",
            showSolved === false
              ? "bg-[#DDE2F1] text-[#3659E3] dark:bg-[#1a2237] dark:text-[#7EA2FF]"
              : "bg-[#F5F8FE] text-[#667094] dark:bg-[#1A2132] dark:text-[#8D96B2]",
            "hover:bg-[#E5EAFA] dark:hover:bg-[#23263a]"
          )}
          onClick={() => setShowSolved(prev => prev === false ? null : false)}
        >
          Unsolved
        </button>
      </div>
      {/* Second row: Easy, Medium, Hard difficulty pills */}
      <div className="flex gap-2 w-full justify-center">
        {["Easy", "Medium", "Hard"].map(tag => (
          <button
            type="button"
            key={tag}
            className={classNames(
              "px-2 py-1 text-xs sm:text-sm font-semibold rounded-full capitalize transition",
              difficultyFilter === tag
                ? "bg-[#DDE2F1] text-[#3659E3] dark:bg-[#1a2237] dark:text-[#7EA2FF]"
                : "bg-[#F5F8FE] text-[#667094] dark:bg-[#1A2132] dark:text-[#8D96B2]",
              "hover:bg-[#E5EAFA] dark:hover:bg-[#23263a]"
            )}
            onClick={() => setDifficultyFilter(f => f === tag ? null : tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      {/* Clear button */}
      <div className="flex justify-end pt-1">
        <button
          type="button"
          className="px-3 py-1 font-semibold rounded-full text-xs transition bg-[#F0F2F8] text-[#8490AA] hover:bg-[#EDF1FE] dark:bg-[#20253C] dark:text-[#96a1cb]"
          onClick={onClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
