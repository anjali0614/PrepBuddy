import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import SheetSidebar from "../components/Sheets/SheetSidebar";
import SheetBoard from "../components/Sheets/SheetBoard";
import { createSheet, fetchSheetById, fetchSheets, updateSheet } from "../features/sheets/sheetsSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const rawSheets = useSelector(state => state.sheets.sheets);
  const sheets = useMemo(() => rawSheets || [], [rawSheets]);
  const selectedSheet = useSelector(state => state.sheets.selectedSheet);

  const [showStarred, setShowStarred] = useState(false);
  const [showSolved, setShowSolved] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(260);

  useEffect(() => { dispatch(fetchSheets()); }, [dispatch]);
  useEffect(() => {
    if (sheets.length > 0 && !selectedSheet) {
      dispatch(fetchSheetById(sheets[0]._id));
    }
  }, [sheets, selectedSheet, dispatch]);

  const handleAddSheet = async (title) => {
    if (!title) return;
    const result = await dispatch(createSheet({ title }));
    await dispatch(fetchSheets());
    const newSheet = result.payload;
    const selectId = newSheet && newSheet._id
      ? newSheet._id
      : (sheets.length > 0 ? sheets[sheets.length - 1]._id : undefined);
    if (selectId) dispatch(fetchSheetById(selectId));
  };

  const handleSelectSheet = (id) => {
    if (id) dispatch(fetchSheetById(id));
  };

  // Sheet step add, called from SheetBoard
  const handleAddStep = async () => {
    if (!selectedSheet) return;
    const updated = JSON.parse(JSON.stringify(selectedSheet));
    if (!updated.steps) updated.steps = [];
    updated.steps.push({
      name: "Untitled Step",
      questions: [],
      substeps: []
    });
    await dispatch(updateSheet({ id: selectedSheet._id, data: updated }));
    dispatch(fetchSheetById(selectedSheet._id));
  };

  // Sheet title rename, called from SheetBoard
  const handleEditSheetTitle = async (id, newTitle) => {
    if (!id || !newTitle?.trim()) return;
    // Find the sheet to update
    const sheetToUpdate = sheets.find(s => s._id === id) || selectedSheet;
    // Prevent unnecessary update
    if (!sheetToUpdate || newTitle.trim() === sheetToUpdate.title) return;
    await dispatch(updateSheet({ id, data: { ...sheetToUpdate, title: newTitle.trim() } }));
    await dispatch(fetchSheets());
    await dispatch(fetchSheetById(id));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-transparent">
      <SheetSidebar
        sidebarWidth={sidebarWidth}
        setSidebarWidth={setSidebarWidth}
        showStarred={showStarred}
        setShowStarred={setShowStarred}
        showSolved={showSolved}
        setShowSolved={setShowSolved}
        difficultyFilter={difficultyFilter}
        setDifficultyFilter={setDifficultyFilter}
        onClearFilter={() => { setShowStarred(false); setShowSolved(null); setDifficultyFilter(null); }}
        sheets={sheets}
        selectedSheet={selectedSheet}
        onAddSheet={handleAddSheet}
        onSelectSheet={handleSelectSheet}
      />
      <div className="flex-1 overflow-y-auto relative transition-all duration-200">
        <SheetBoard
          sheet={selectedSheet}
          filters={{ showStarred, showSolved, difficultyFilter }}
          onAddStep={handleAddStep}
          onEditSheetTitle={handleEditSheetTitle}
        />
      </div>
    </div>
  );
}
