import {
  createSelector,
  createSlice,
  type EntityState,
  nanoid,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "./store.ts";
import type {
  CurrentFolderType,
  FolderId,
  FolderName,
  FolderType,
} from "./Folder.ts";
import { foldersAdapter } from "./adapters.ts";

interface FolderState {
  folder: EntityState<FolderType, FolderId>;
  currentFolder: CurrentFolderType;
}

const initialState: FolderState = {
  folder: foldersAdapter.getInitialState(),
  currentFolder: undefined,
};

export const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    // FolderType
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
      if (payload.id) {
        foldersAdapter.upsertOne(state.folder, {
          ...state.folder.entities[payload.id],
          folderName: payload.folderName,
        });
      }
    },
    changeCurrentFolder(state, { payload }: PayloadAction<CurrentFolderType>) {
      state.currentFolder = payload;
    },
  },
  selectors: {
    folders: (state) => state.folder,
  },
});

export const { selectors: foldersSelectors } = foldersSlice;
export const foldersAdapterSelectors = foldersAdapter.getSelectors(
  foldersSelectors.folders,
);

//сука не получается написать селектор этот, все ломается когла я папку добавляю, уже как тока не пробовал, прикола не понимаю

export const selectFolders = (state: RootState) => {
  return Object.values(state.folder.folder.entities);
};

export const selectCurrentFolder = (state: RootState) =>
  state.folder.currentFolder;

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
