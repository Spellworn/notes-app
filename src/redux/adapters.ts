import { createEntityAdapter } from "@reduxjs/toolkit";
import type { NoteId, Notes } from "./Note.ts";

export const notesAdapter = createEntityAdapter<Notes, NoteId>({
  selectId: (note: Notes) => note.id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});
