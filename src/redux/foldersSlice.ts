import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store.ts";

export interface Folder {
  folder: string;
}

const initialState: Folder[] = [{ folder: "Заметки" }];

export const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    addFolder(state, { payload }: PayloadAction<string>) {
      state.push({ folder: payload });
    },
    deleteFolder(state, { payload }: PayloadAction<string>) {
      state.filter((folder) => folder.folder !== payload);
    },
  },
});

export const selectFolders = (state: RootState) => state.folder;
export const { addFolder, deleteFolder } = foldersSlice.actions;
