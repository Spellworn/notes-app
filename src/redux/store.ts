import { configureStore } from "@reduxjs/toolkit";
import { notesSlice } from "./notesSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { foldersSlice } from "./foldersSlice.ts";

export const store = configureStore({
  reducer: { notes: notesSlice.reducer, folder: foldersSlice.reducer },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
