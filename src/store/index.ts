//social-basic\src\store\index.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import auth from "./slices/authSlice";
import feed from "./slices/feedSlice";
import users from "./slices/usersSlice";

// Storage compatible con SSR (noop en server, localStorage en client)
const createNoopStorage = () => ({
  getItem(_key: string) { return Promise.resolve(null); },
  setItem(_key: string, value: string) { return Promise.resolve(value); },
  removeItem(_key: string) { return Promise.resolve(); },
});
const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const reducer = combineReducers({ auth, feed, users });

const persisted = persistReducer(
  { key: "root", storage, whitelist: ["auth", "feed", "users"] },
  reducer
);

export const store = configureStore({
  reducer: persisted,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
