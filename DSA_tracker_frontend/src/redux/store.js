
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import sheetsReducer from "../features/sheets/sheetsSlice";

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  sheets: sheetsReducer,
});

const resettableRootReducer = (state, action) => {
  // Reset state on logout or delete account
  if (action.type === 'auth/logout/fulfilled' || action.type === 'auth/deleteAccount/fulfilled') {
    state = undefined;
  }
  
  return rootReducer(state, action);
};

export default configureStore({
  reducer: resettableRootReducer,
});
