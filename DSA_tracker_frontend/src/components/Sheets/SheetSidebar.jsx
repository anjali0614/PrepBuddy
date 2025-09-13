import React, { useState, useRef, useEffect } from "react";
import {
  FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown,
  FaFilter, FaPlus, FaTrash, FaThLarge, 
} from "react-icons/fa";
import classNames from "classnames";
import QuestionFilter from "./QuestionFilter";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog"

// Sidebar widths in px
const SIDEBAR_COLLAPSED = 72;
const SIDEBAR_EXPANDED = 274;

export default function SheetSidebar({
  showStarred, setShowStarred,
  showSolved, setShowSolved,
  difficultyFilter, setDifficultyFilter,
  onClearFilter,
  sheets = [],
  selectedSheet,
  onAddSheet,
  onDeleteSheet,
  onSelectSheet
}) {
  const [expanded, setExpanded] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sheetListOpen, setSheetListOpen] = useState(false);
  const [addingSheet, setAddingSheet] = useState(false);
  const [sheetTitle, setSheetTitle] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, sheet: null });
  const addBtnRef = useRef(null);
  const filterBtnRef = useRef(null);
  const sheetBtnRef = useRef(null);

  // Collapsed mode floating
  const [filterFloating, setFilterFloating] = useState(false);
  const [sheetFloating, setSheetFloating] = useState(false);
  const [floatingInputPos, setFloatingInputPos] = useState({ top: 200, left: 200 });
  const [floatingFilterPos, setFloatingFilterPos] = useState({ top: 120, left: 120 });
  const [floatingSheetsPos, setFloatingSheetsPos] = useState({ top: 200, left: 150 });

  function toggleFilterMenu() {
    if (expanded) {
      setFilterOpen(f => !f);
      if (!filterOpen) setSheetListOpen(false);
    } else {
      if (filterBtnRef.current) {
        const rect = filterBtnRef.current.getBoundingClientRect();
        setFloatingFilterPos({ top: rect.top + rect.height / 2 - 18, left: rect.right + 20 });
      }
      setFilterFloating(true);
      setSheetFloating(false);
    }
  }
  function toggleSheetsMenu() {
    if (expanded) {
      setSheetListOpen(o => !o);
      if (!sheetListOpen) setFilterOpen(false);
    } else {
      if (sheetBtnRef.current) {
        const rect = sheetBtnRef.current.getBoundingClientRect();
        setFloatingSheetsPos({ top: rect.top + rect.height / 2 - 18, left: rect.right + 20 });
      }
      setSheetFloating(true);
      setFilterFloating(false);
    }
  }
  function showFloatingInput() {
    if (addBtnRef.current) {
      const rect = addBtnRef.current.getBoundingClientRect();
      setFloatingInputPos({ top: rect.top + rect.height / 2 - 26, left: rect.right + 20 });
    }
    setAddingSheet(true);
  }
  function handleAddSheet(e) {
    e.preventDefault();
    if (sheetTitle.trim()) {
      onAddSheet(sheetTitle.trim());
      setSheetTitle("");
      setAddingSheet(false);
    }
  }

  function handleDeleteClick(sheet) {
    setDeleteConfirmation({ open: true, sheet });
  }

  function handleConfirmDelete() {
    if (deleteConfirmation.sheet) {
      onDeleteSheet(deleteConfirmation.sheet._id);
      setDeleteConfirmation({ open: false, sheet: null });
    }
  }

  function handleCancelDelete() {
    setDeleteConfirmation({ open: false, sheet: null });
  }

  useEffect(() => {
    function onDoc(e) {
      if (filterFloating || sheetFloating || addingSheet) {
        if (!e.target.closest('.floating-panel')) {
          setFilterFloating(false);
          setSheetFloating(false);
          setAddingSheet(false);
        }
      }
    }
    if (filterFloating || sheetFloating || addingSheet)
      document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [filterFloating, sheetFloating, addingSheet]);

  return (
    <>
      <aside
        className={classNames(
          "relative flex flex-col h-full shadow-xl border-r transition-all duration-200 z-30",
          "bg-white dark:bg-[#161A23] border-[#E2E8F0] dark:border-[#232734]",
          "rounded-l-[20px] rounded-r-[20px]",
          expanded ? "w-[220px] min-w-[200px]" : "w-[70px] min-w-[70px]"
        )}
        style={{ transition: "width 0.22s cubic-bezier(.6,1.5,.4,1)" }}
      >
        {/* Toggle Handle */}
        <div
          className={classNames(
            "absolute -right-3 top-60 z-40 flex items-center justify-center rounded-full w-8 h-8 border shadow bg-white dark:bg-[#23263A] border-[#E2E8F0] dark:border-[#232734] cursor-pointer hover:bg-gray-100 dark:hover:bg-[#26293d] transition"
          )}
          role="button"
          tabIndex={0}
          onClick={() => setExpanded(e => !e)}
        >
          {expanded
            ? <FaChevronLeft className="text-gray-400" />
            : <FaChevronRight className="text-gray-400" />}
        </div>

        {/* Main */}
        <div className={classNames(
          "flex-1 flex flex-col pt-8 gap-5",
          expanded ? "px-4" : "items-center justify-start"
        )}>

          {/* FILTER */}
          <div className={classNames("relative w-full")}>
            <button
              ref={filterBtnRef}
              onClick={toggleFilterMenu}
              className={classNames(
                "flex items-center w-full px-2 py-2 rounded-full font-semibold text-base shadow gap-3 z-10 relative",
                "bg-gradient-to-r from-[#F2F6FF] to-[#E5EAFE] dark:from-[#20243A] dark:to-[#252C43]",
                "hover:from-[#E8EDFC] hover:to-[#DEE4FC] dark:hover:from-[#191D30] dark:hover:to-[#21263a]",
                "text-[#3659E3] dark:text-[#7EA2FF] transition",
                !expanded && "justify-center"
              )}
              style={{ boxShadow: (expanded && filterOpen) ? "0 2px 14px 0 rgba(50,78,197,0.11)" : undefined }}
            >
              <FaFilter className="text-xl" />
              {expanded && <span>Filters</span>}
              {expanded && (
                <span className="ml-auto">{filterOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
              )}
            </button>
            {(expanded && filterOpen) && (
              <div className="mt-2 relative z-50">
                <QuestionFilter
                  showStarred={showStarred}
                  setShowStarred={setShowStarred}
                  showSolved={showSolved}
                  setShowSolved={setShowSolved}
                  difficultyFilter={difficultyFilter}
                  setDifficultyFilter={setDifficultyFilter}
                  onClear={onClearFilter}
                  vertical
                />
              </div>
            )}
          </div>
          {/* SHEETS */}
          <div className={classNames("relative w-full")}>
            <button
              ref={sheetBtnRef}
              onClick={toggleSheetsMenu}
              className={classNames(
                "flex items-center w-full px-2 py-2 rounded-full font-semibold text-base gap-3 shadow z-10 relative",
                "bg-gradient-to-r from-[#F2F6FF] to-[#E5EAFE] dark:from-[#20243A] dark:to-[#252C43]",
                "hover:from-[#E8EDFC] hover:to-[#DEE4FC] dark:hover:from-[#191D30] dark:hover:to-[#21263a]",
                "text-[#3659E3] dark:text-[#7EA2FF] transition",
                !expanded && "justify-center"
              )}
              style={{ boxShadow: (expanded && sheetListOpen) ? "0 2px 14px 0 rgba(50,78,197,0.11)" : undefined }}
            >
              {!expanded && <FaThLarge className="text-lg" />}
              {expanded && <span>Your Sheets</span>}
              {expanded && (
                <span className="ml-auto">{sheetListOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
              )}
            </button>
            {expanded && sheetListOpen && (
              <div className="w-full mt-2 px-1 relative z-50">
                <ul className={classNames("max-h-64 overflow-y-auto", "flex flex-col gap-1")}>
                  {sheets.map(sheet => (
                    <li key={sheet._id} className="flex items-center">
                      <button
                        title={sheet.title}
                        className={classNames(
                          "truncate py-2 px-4 w-full rounded-[8px] text-left text-[15px] font-medium transition",
                          selectedSheet?._id === sheet._id
                            ? "bg-[#E3EAFE] text-[#4361EE] font-bold dark:bg-[#232A46] dark:text-[#7EA2FF]"
                            : "hover:bg-[#EEF2FE] text-[#334155] dark:text-[#8D96B2] dark:hover:bg-[#1C2141]"
                        )}
                        style={{ minWidth: expanded ? 0 : 44 }}
                        onClick={() => onSelectSheet(sheet._id)}
                      >
                        {expanded ? sheet.title : sheet.title.slice(0, 2).toUpperCase()}
                      </button>
                      {expanded && (
                        <button
                          className="ml-1 p-1 rounded hover:bg-red-100 text-red-500 dark:hover:bg-[#2B2026]"
                          title="Delete Sheet"
                          onClick={() => handleDeleteClick(sheet)}
                        >
                          <FaTrash className="w-[13px] h-[13px]" />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Add Sheet Button */}
        <div className={classNames(
          "relative px-2 py-5 border-t border-[#E5EAEF] dark:border-[#232734] bg-[#FAFBFC] dark:bg-[#141925] rounded-bl-[20px] rounded-br-[20px]",
          expanded ? "" : "flex items-center justify-center"
        )}>
          <button
            ref={addBtnRef}
            className={classNames(
              "flex items-center justify-center gap-2 font-semibold text-base rounded-md h-12 shadow transition",
              "bg-gradient-to-r from-[#3659E3] to-[#5178F9] text-white hover:from-[#2744B2] hover:to-[#4f67a8]",
              !expanded ? "w-12" : "w-full"
            )}
            onClick={showFloatingInput}
          >
            <FaPlus />
            {expanded && <span>Add Sheet</span>}
          </button>
        </div>
      </aside>

      {/* Floating Panels for Collapsed Mode */}
      {(filterFloating && !expanded) && (
        <div
          className={classNames(
            "fixed z-[9999] floating-panel"
          )}
          style={{
            top: floatingFilterPos.top || 100,
            left: floatingFilterPos.left || (SIDEBAR_COLLAPSED + 20),
            minWidth: "230px"
          }}
        >
          <div className="rounded-xl shadow-xl bg-white dark:bg-[#181B26] border border-[#E0E5F1] dark:border-[#232732] p-3">
            <QuestionFilter
              showStarred={showStarred}
              setShowStarred={setShowStarred}
              showSolved={showSolved}
              setShowSolved={setShowSolved}
              difficultyFilter={difficultyFilter}
              setDifficultyFilter={setDifficultyFilter}
              onClear={onClearFilter}
              vertical
            />
          </div>
        </div>
      )}

      {(sheetFloating && !expanded) && (
        <div
          className={classNames(
            "fixed z-[9999] floating-panel"
          )}
          style={{
            top: floatingSheetsPos.top || 150,
            left: floatingSheetsPos.left || (SIDEBAR_COLLAPSED + 20),
            minWidth: "235px"
          }}
        >
          <div className="rounded-xl shadow-xl bg-white dark:bg-[#181B26] border border-[#E0E5F1] dark:border-[#232732] py-1 px-0 floating-panel">
            <ul className={classNames("max-h-60 overflow-y-auto px-2 flex flex-col gap-1")}>
              {sheets.map(sheet => (
                <li key={sheet._id} className="flex items-center">
                  <button
                    title={sheet.title}
                    className={classNames(
                      "truncate py-2 px-4 rounded-[8px] text-left w-full text-[15px] font-medium transition",
                      selectedSheet?._id === sheet._id
                        ? "bg-[#E3EAFE] text-[#4361EE] font-bold dark:bg-[#232A46] dark:text-[#7EA2FF]"
                        : "hover:bg-[#EEF2FE] text-[#334155] dark:text-[#8D96B2] dark:hover:bg-[#1C2141]"
                    )}
                    style={{ minWidth: 44 }}
                    onClick={() => { onSelectSheet(sheet._id); setSheetFloating(false); }}
                  >
                    {sheet.title}
                  </button>
                  <button
                    className="ml-2 mr-1 p-1 rounded hover:bg-red-100 text-red-500 dark:hover:bg-[#2B2026]"
                    title="Delete Sheet"
                    onClick={() => handleDeleteClick(sheet)}
                  >
                    <FaTrash className="w-[13px] h-[13px]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Floating Add Sheet Input */}
      {addingSheet && (
        <div
          className="fixed z-[9999] floating-panel"
          style={{
            left: floatingInputPos.left || (expanded ? SIDEBAR_EXPANDED + 15 : SIDEBAR_COLLAPSED + 15),
            top: floatingInputPos.top || 180,
            minWidth: expanded ? "260px" : "200px"
          }}
        >
          <form
            className="bg-white dark:bg-[#181B26] border border-[#3B5ED9] rounded-xl shadow-xl flex gap-2 items-center px-4 py-3"
            onSubmit={handleAddSheet}
          >
            <input
              type="text"
              autoFocus
              className="flex-grow rounded px-3 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-[#23263a] focus:ring-2 focus:ring-[#5178F9] outline-none"
              placeholder="Enter sheet name"
              value={sheetTitle}
              onChange={e => setSheetTitle(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Escape") {
                  setAddingSheet(false);
                  setSheetTitle("");
                }
              }}
            />
            <button
              type="submit"
              disabled={!sheetTitle.trim()}
              className="bg-[#3659E3] text-white rounded-md px-4 py-2 font-semibold shadow disabled:opacity-50"
            >Save</button>
            <button
              type="button"
              onClick={() => { setAddingSheet(false); setSheetTitle(""); }}
              className="text-lg font-bold text-gray-500 hover:text-red-500 dark:text-gray-300 px-2"
              title="Cancel"
            >×</button>
          </form>
        </div>
      )}

      {/* ConfirmDeleteDialog */}
      <ConfirmDeleteDialog
        isOpen={deleteConfirmation.open}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Sheet"
        message="This action cannot be undone."
        itemName={deleteConfirmation.sheet?.title}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}