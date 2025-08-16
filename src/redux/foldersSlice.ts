import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store.ts";

export interface FolderType {
  folderName: string;
  id: string;
}

export interface Folder {
  folder: FolderType[];
  currentFolder: string;
}

const initialState: Folder = {
  folder: [{ folderName: "Заметки", id: nanoid() }],
  currentFolder: "",
};

export const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    addFolder(state, { payload }: PayloadAction<string>) {
      state.folder.push({ folderName: payload, id: nanoid() });
      state.currentFolder = payload;
    },
    deleteFolder(state, { payload }: PayloadAction<string>) {
      state.folder.filter((folder) => folder.id !== payload);
    },
    changeCurrentFolder(state, { payload }: PayloadAction<string>) {
      state.currentFolder = payload;
    },
  },
});

export const selectFolders = (state: RootState) => state.folder.folder;
export const selectCurrentFolder = (state: RootState) =>
  state.folder.currentFolder;
export const { addFolder, deleteFolder, changeCurrentFolder } =
  foldersSlice.actions;
