import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { notesSlice } from "./notesSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { foldersSlice } from "./foldersSlice.ts";

export const rootReducer = combineReducers({
  notes: notesSlice.reducer,
  folder: foldersSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
