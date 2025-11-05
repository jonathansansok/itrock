//social-basic\src\store\slices\authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, SessionUser } from "@/types";

const initial: AuthState = { isAuthenticated: false, user: null };

const slice = createSlice({
  name: "auth",
  initialState: initial,
  reducers: {
    setSession(state, action: PayloadAction<SessionUser | null>) {
      state.isAuthenticated = !!action.payload;
      state.user = action.payload;
    },
    signOutClient(state) {
      state.isAuthenticated = false; state.user = null;
    },
  },
});
export const { setSession, signOutClient } = slice.actions;
export default slice.reducer;
