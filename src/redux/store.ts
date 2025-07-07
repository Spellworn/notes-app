import { configureStore } from "@reduxjs/toolkit";
import {notesSlice} from "./notesSlice.ts";

export const store = configureStore({
  reducer: {notes: notesSlice.reducer},
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
