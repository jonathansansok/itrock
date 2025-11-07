import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LocalUser } from "@/interfaces/domain"; 

interface UsersState { items: LocalUser[] }

const initial: UsersState = { items: [] };

const slice = createSlice({
  name: "users",
  initialState: initial,
  reducers: {
    addUser(state, action: PayloadAction<LocalUser>) {
      const email = action.payload.email.toLowerCase();
      const exists = state.items.some(u => u.email.toLowerCase() === email);
      if (!exists) state.items.push(action.payload);
    },
  },
});

export const { addUser } = slice.actions;
export default slice.reducer;
