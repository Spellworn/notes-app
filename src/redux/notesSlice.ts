import {
  createSelector,
  createSlice,
  type EntityState,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  type NoteAdd,
  type NoteId,
  type Notes,
  type UpdateDataAction,
} from "./Note";
import { fetchNotes } from "./thunks.ts";
import { notesAdapter } from "./adapters.ts";

type StatusType = "error" | "loading" | "fulfilled";

interface NotesState {
  notes: EntityState<Notes, NoteId>;
  status?: StatusType;
}

const initialState: NotesState = {
  notes: notesAdapter.getInitialState(),
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote(state, { payload }: PayloadAction<NoteAdd>) {
      notesAdapter.addOne(state.notes, {
        id: payload.id,
        title: "",
        body: "",
        // TODO: thunk
        date: new Date().toISOString(),
        folder: payload.folder ? payload.folder : "Заметки",
      });
    },

    updateTitle: (state, { payload }: PayloadAction<UpdateDataAction>) => {
      if (payload.id) {
        notesAdapter.upsertOne(state.notes, {
          ...state.notes.entities[payload.id],
          title: payload.text,
        });
      }
    },

    updateBody: (state, { payload }: PayloadAction<UpdateDataAction>) => {
      if (payload.id) {
        notesAdapter.upsertOne(state.notes, {
          ...state.notes.entities[payload.id],
          body: payload.text,
        });
      }
    },

    deleteNote: (state, { payload }: PayloadAction<NoteId>) => {
      notesAdapter.removeOne(state.notes, payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        notesAdapter.upsertMany(state.notes, action.payload);
        state.status = "fulfilled";
      })
      .addCase(fetchNotes.rejected, (state) => {
        state.status = "error";
      });
  },
  selectors: {
    notes: (state) => state.notes,
  },
});

export const { selectors: notesSelectors } = notesSlice;

// адаптеру нужно понимать в общем сторе как дойти до наших notes
export const adapterSelectors = notesAdapter.getSelectors(notesSelectors.notes);

export const selectNoteById = createSelector(
  [adapterSelectors.selectEntities, (_, id: NoteId | undefined) => id],
  (notes, id) => {
    if (!id) {
      return undefined;
    }
    return notes[id];
  },
);

export const selectSearchedItemsByFolder = (search: string, folder: string) =>
  createSelector([adapterSelectors.selectAll], (notes) => {
    if (!search)
      return notes
        .filter((note) =>
          folder
            ? (note.title || note.body) && note.folder === folder
            : note.title || note.body,
        )
        .map((note) => note.id);

    return notes
      .filter((note: Notes) =>
        folder
          ? (note.title?.toLowerCase().includes(search.toLowerCase()) ||
              note.body?.toLowerCase().includes(search.toLowerCase())) &&
            note.folder === folder
          : note.title?.toLowerCase().includes(search.toLowerCase()) ||
            note.body?.toLowerCase().includes(search.toLowerCase()),
      )
      .map((note) => note.id);
  });

// export const selectSearchedItems = (search: string) =>
//   createSelector([adapterSelectors.selectAll], (notes) => {
//     if (!search)
//       return notes
//         .filter((note) => note.title || note.body)
//         .map((note) => note.id);
//
//     return notes
//       .filter(
//         (note: Notes) =>
//           note.title?.toLowerCase().includes(search.toLowerCase()) ||
//           note.body?.toLowerCase().includes(search.toLowerCase()),
//       )
//       .map((note) => note.id);
//   });

export const { addNote, updateTitle, updateBody, deleteNote } =
  notesSlice.actions;
