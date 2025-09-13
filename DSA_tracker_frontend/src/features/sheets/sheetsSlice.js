import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./sheetsAPI";

export const fetchSheets = createAsyncThunk("sheets/fetchSheets", api.fetchSheets);
export const createSheet = createAsyncThunk("sheets/createSheet", api.createSheet);
export const fetchSheetById = createAsyncThunk("sheets/fetchSheetById", api.fetchSheetById);
export const updateSheet = createAsyncThunk("sheets/updateSheet", api.updateSheet);
export const deleteSheet = createAsyncThunk("sheets/deleteSheet", api.deleteSheet);

const initialState = {
  sheets: [], 
  selectedSheet: null, 
  loading: false, 
  error: null, 
  filters: {}
};

const sheetsSlice = createSlice({
  name: "sheets",
  initialState,
  reducers: {
    setSelectedSheet(state, action) { 
      state.selectedSheet = action.payload; 
    },
    updateSheetInState(state, action) { 
      state.selectedSheet = action.payload; 
    },
    setFilters(state, action) { 
      state.filters = action.payload; 
    },
    clearAllSheetsData(state) {
      // Reset to initial state
      state.sheets = [];
      state.selectedSheet = null;
      state.loading = false;
      state.error = null;
      state.filters = {};
    }
  },
  extraReducers: (b) => {
    b.addCase(fetchSheets.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(fetchSheets.fulfilled, (s, { payload }) => { 
      s.sheets = payload; 
      s.loading = false;
    });
    b.addCase(fetchSheets.rejected, (s, action) => {
      s.loading = false;
      s.error = action.error.message;
    });
    b.addCase(createSheet.fulfilled, (s, { payload }) => { 
      s.sheets.push(payload); 
    });
    b.addCase(fetchSheetById.fulfilled, (s, { payload }) => { 
      s.selectedSheet = payload; 
    });
    b.addCase(updateSheet.fulfilled, (s, { payload }) => { 
      s.selectedSheet = payload;
      // Also update in sheets array if it exists there
      const index = s.sheets.findIndex(sheet => sheet._id === payload._id);
      if (index !== -1) {
        s.sheets[index] = payload;
      }
    });
    b.addCase(deleteSheet.fulfilled, (s, { meta }) => {
      s.sheets = s.sheets.filter(sh => sh._id !== meta.arg);
      if (s.selectedSheet && s.selectedSheet._id === meta.arg) {
        s.selectedSheet = null;
      }
    });
    
    // Listen for login actions and clear sheets if user changed
    b.addCase('auth/login/fulfilled', (state, action) => {
      // Check if this was a user change by looking at the auth state
      // We'll clear sheets data when login happens to be safe
      state.sheets = [];
      state.selectedSheet = null;
      state.filters = {};
      state.loading = false;
      state.error = null;
    });
    
    // Also listen for setUser action (for Google login, etc.)
    b.addCase('auth/setUser', (state) => {
      state.sheets = [];
      state.selectedSheet = null;
      state.filters = {};
      state.loading = false;
      state.error = null;
    });
  },
});

export const { 
  setSelectedSheet, 
  updateSheetInState, 
  setFilters, 
  clearAllSheetsData 
} = sheetsSlice.actions;

export default sheetsSlice.reducer;