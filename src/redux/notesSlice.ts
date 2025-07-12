import {
  createSelector,
  createSlice,
  type EntityState,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { type NoteId, type Notes } from "./Note";
import { fetchNotes } from "./thunks.ts";
import { notesAdapter } from "./adapters.ts";

type StatusType = "error" | "loading" | "fulfilled";

interface NotesState {
  notes: EntityState<Notes, NoteId>;
  search: string;
  status?: StatusType;
}

const initialState: NotesState = {
  notes: notesAdapter.getInitialState(),
  search: "",
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote(state, { payload }: PayloadAction<NoteId>) {
      notesAdapter.addOne(state.notes, {
        id: payload,
        title: "",
        body: "",
        // TODO: thunk
        date: new Date().toISOString(),
      });
    },
    updateNote: (
      state,
      { payload }: PayloadAction<Partial<Notes> & { id: NoteId | undefined }>,
    ) => {
      if (payload.id) {
        // TODO: разобраца че это за хуйня ваще
        notesAdapter.upsertOne(state.notes, {
          ...state.notes.entities[payload.id],
          // title: payload.title,
          // body: payload.body,
          title:
            payload.title !== undefined
              ? payload.title
              : state.notes.entities[payload.id]?.title,
          body:
            payload.body !== undefined
              ? payload.body
              : state.notes.entities[payload.id]?.body,
        });
      }
    },
    deleteNote: (state, { payload }: PayloadAction<NoteId>) => {
      notesAdapter.removeOne(state.notes, payload);
    },
    // TODO:
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
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
    search: (state) => state.search,
  },
});

export const { selectors: notesSelectors, actions: notesActions } = notesSlice;

// адаптеру нужно понимать в общем сторе как дойти до наших notes
export const adapterSelectors = notesAdapter.getSelectors(notesSelectors.notes);

export const selectSearchedItems = createSelector(
  [adapterSelectors.selectAll, notesSelectors.search],
  (notes, search) => {
    if (!search) return notes.map((note) => note.id);

    return notes
      .filter(
        (note: Notes) =>
          note.title?.toLowerCase().includes(search.toLowerCase()) ||
          note.body?.toLowerCase().includes(search.toLowerCase()),
      )
      .map((note) => note.id);
  },
);

export const { addNote, updateNote, deleteNote, setSearch } =
  notesSlice.actions;

// TODO:
// export const selectId = (state: RootState) => state.notes.notes[0].id;
