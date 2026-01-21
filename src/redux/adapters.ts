import { createEntityAdapter } from "@reduxjs/toolkit";
import type { NoteId, Notes } from "./Note.ts";
import type { FolderId, FolderType } from "./Folder.ts";

export const notesAdapter = createEntityAdapter<Notes, NoteId>({
  selectId: (note: Notes) => note.id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

export const foldersAdapter = createEntityAdapter<FolderType, FolderId>({
  selectId: (folder: FolderType) => folder.id,
});
