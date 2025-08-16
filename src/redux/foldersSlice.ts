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
      const folder = state.folder.filter((folder) => folder.id === payload);
      if (folder) {
        state.folder = state.folder.filter((folder) => folder.id !== payload);
        if (folder[0].folderName === state.currentFolder) {
          state.currentFolder = "";
        }
      }
    },
    renameFolder(
      state,
      { payload }: PayloadAction<{ id: string; folderName: string }>,
    ) {
      const folder = state.folder.find((folder) => folder.id === payload.id);
      if (folder) {
        if (folder.folderName === state.currentFolder) {
          state.currentFolder = payload.folderName;
        }

        folder.folderName = payload.folderName;
        state.currentFolder = payload.folderName;
      }
    },
    changeCurrentFolder(state, { payload }: PayloadAction<string>) {
      state.currentFolder = payload;
    },
  },
});

export const selectFolders = (state: RootState) => state.folder.folder;
export const selectCurrentFolder = (state: RootState) =>
  state.folder.currentFolder;
export const selectFolderById = (state: RootState, id: string) =>
  state.folder.folder.filter((folder) => folder.id === id);

export const { addFolder, deleteFolder, renameFolder, changeCurrentFolder } =
  foldersSlice.actions;
