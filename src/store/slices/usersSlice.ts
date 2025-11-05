// social-basic/src/store/slices/usersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LocalUser } from "@/interfaces";

interface UsersState { items: LocalUser[] }

const initial: UsersState = { items: [] };

const slice = createSlice({
  name: "users",
  initialState: initial,
  reducers: {
    addUser(state, action: PayloadAction<LocalUser>) {
      const email = action.payload.email.toLowerCase();
      const exists = state.items.some(u => u.email.toLowerCase() === email);
      if (!exists) {
        console.log("[usersSlice.addUser] adding", action.payload.email);
        state.items.push(action.payload);
      } else {
        console.log("[usersSlice.addUser] already exists", action.payload.email);
      }
    },
  },
});

export const { addUser } = slice.actions;
export default slice.reducer;
