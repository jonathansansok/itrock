import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LocalUser { id: string; name: string; email: string }
interface UsersState { items: LocalUser[] }

const initial: UsersState = { items: [] };

const slice = createSlice({
  name: "users",
  initialState: initial,
  reducers: {
    addUser(state, action: PayloadAction<LocalUser>) {
      const exists = state.items.some(u => u.email.toLowerCase() === action.payload.email.toLowerCase());
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
