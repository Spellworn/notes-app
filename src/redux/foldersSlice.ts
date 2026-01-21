import {
  createSelector,
  createSlice,
  type EntityState,
  nanoid,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  CurrentFolderType,
  FolderId,
  FolderName,
  FolderType,
} from "./Folder.ts";
import { foldersAdapter } from "./adapters.ts";
import type { RootState } from "./store.ts";

interface FolderState {
  folder: EntityState<FolderType, FolderId>;
  currentFolder: CurrentFolderType;
}

const initialState: FolderState = {
  folder: foldersAdapter.getInitialState(),
  currentFolder: undefined,
};

export const foldersSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    addFolder: (state, { payload }: PayloadAction<FolderName>) => {
      foldersAdapter.addOne(state.folder, {
        id: nanoid(),
        folderName: payload,
      });
    },
    deleteFolder: (state, { payload }: PayloadAction<FolderId>) => {
      foldersAdapter.removeOne(state.folder, payload);
    },
    renameFolder: (
      state,
      { payload }: PayloadAction<{ id: string; folderName: string }>,
    ) => {
      foldersAdapter.upsertOne(state.folder, {
        ...state.folder.entities[payload.id],
        folderName: payload.folderName,
      });
    },
    changeCurrentFolder(state, { payload }: PayloadAction<CurrentFolderType>) {
      state.currentFolder = payload;
    },
  },
  selectors: {
    folder: (state) => state.folder,
    currentFolder: (state) => state.currentFolder,
  },
});

export const { selectors: sliceSelectors } = foldersSlice;
export const foldersAdapterSelectors = foldersAdapter.getSelectors(
  (state: RootState) => sliceSelectors.folder(state),
);

export const selectFolderById = createSelector(
  [foldersAdapterSelectors.selectEntities, (_, id: FolderId | undefined) => id],
  (folders, id) => {
    if (!id) {
      return undefined;
    }
    return folders[id];
  },
);

export const { addFolder, deleteFolder, renameFolder, changeCurrentFolder } =
  foldersSlice.actions;
