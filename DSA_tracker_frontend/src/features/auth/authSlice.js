import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./authAPI";

const getUser = () => {
  const u = localStorage.getItem("dsa_user");
  return u ? JSON.parse(u) : null;
};

export const signup = createAsyncThunk("auth/signup", api.signup);
export const login = createAsyncThunk("auth/login", api.login);
export const logout = createAsyncThunk("auth/logout", api.logout);
export const updateProfile = createAsyncThunk("auth/updateProfile", api.updateProfile);
export const deleteAccount = createAsyncThunk("auth/deleteAccount", api.deleteAccount);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: getUser(), status: null, error: null },
  reducers: {
    setUser(state, action) {
      // Clear sheets before setting new user 
      const currentUserId = state.user?._id || state.user?.id;
      const newUserId = action.payload.user?._id || action.payload.user?.id;
      
      state.user = action.payload.user;
      localStorage.setItem("dsa_user", JSON.stringify(action.payload.user));
      localStorage.setItem("dsa_jwt", action.payload.token);
      
      // Set a flag to indicate if user changed 
      state.userChanged = currentUserId && newUserId && currentUserId !== newUserId;
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem("dsa_user");
      localStorage.removeItem("dsa_jwt");
    },
    clearUserChangedFlag(state) {
      state.userChanged = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state) => {
        state.status = "signedup";
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        // Clear sheets before setting new user if user changed
        const currentUserId = state.user?._id || state.user?.id;
        const newUserId = payload.user?._id || payload.user?.id;
        
        state.user = payload.user;
        localStorage.setItem("dsa_user", JSON.stringify(payload.user));
        localStorage.setItem("dsa_jwt", payload.token);
        
        // Set a flag to indicate if user changed
        state.userChanged = currentUserId && newUserId && currentUserId !== newUserId;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        localStorage.setItem("dsa_user", JSON.stringify(payload.user));
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem("dsa_user");
        localStorage.removeItem("dsa_jwt");
        state.userChanged = false;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem("dsa_user");
        localStorage.removeItem("dsa_jwt");
        state.userChanged = false;
      })
      .addMatcher(
        (action) =>
          action.type.endsWith("/pending") ||
          action.type.endsWith("/rejected") ||
          action.type.endsWith("/fulfilled"),
        (state, action) => {
          if (action.type.endsWith("/pending")) {
            state.status = "loading";
            state.error = null;
          } else if (action.type.endsWith("/fulfilled")) {
            state.status = "succeeded";
            state.error = null;
          } else if (action.type.endsWith("/rejected")) {
            state.status = "failed";
            state.error = action.error.message;
          }
        }
      );
  },
});

export const { setUser, clearUser, clearUserChangedFlag } = authSlice.actions;

export default authSlice.reducer;