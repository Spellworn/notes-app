import {
  createAsyncThunk,
  createSlice,
  nanoid,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "./store.ts";

interface Data {
  posts: Notes[];
  total: number;
  skip: number;
  limit: number;
}

interface Notes {
  id: string;
  title: string;
  body: string;
  date: string;
}

interface NotesState {
  notes: Notes[];
  search: string;
  loading: boolean;
  error: string | null;
}

const url = "https://dummyjson.com/posts";
const initialState: NotesState = {
  notes: [],
  search: "",
  loading: false,
  error: null,
};

export const fetchNotes = createAsyncThunk("todos/fetchNotes", async () => {
  const response = await fetch(url);
  const result: Data = await response.json();

  const now = new Date();
  const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));

  const getRandomDate = (start: Date, end: Date) => {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    ).toISOString();
  };
  const orderedNotes = result.posts.map((note) => ({
    id: nanoid(),
    title: note.title,
    body: note.body,
    date: getRandomDate(oneYearAgo, new Date()),
  }));
  return orderedNotes.slice().sort((a, b) => b.date.localeCompare(a.date));
});

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    noteAdded(state, { payload }: PayloadAction<string>) {
      state.notes.unshift({
        id: payload,
        title: "",
        body: "",
        date: new Date().toISOString(),
      });
    },
    noteUpdated: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: string | number;
        text: string | null;
        title: boolean;
      }>,
    ) => {
      const note = state.notes.find((note: Notes) => note.id === payload.id);
      if (note && payload.text === null) {
        if (payload.title) {
          note.title = "";
        } else {
          note.body = "";
        }
      }
      if (note && payload.text !== null) {
        if (payload.title) {
          note.title = payload.text;
        } else {
          note.body = payload.text;
        }
      }
    },
    noteDeleted: (state, { payload }: PayloadAction<string>) => {
      state.notes = state.notes.filter((note: Notes) => note.id !== payload);
    },
    searchSet: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch todos";
      });
  },
});

export const selectSearchedItems = (state: RootState) => {
  const { notes, search } = state.notes;
  if (!search) return notes;

  return notes.filter(
    (note: Notes) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.body.toLowerCase().includes(search.toLowerCase()),
  );
};

export const { searchSet, noteAdded, noteUpdated, noteDeleted } =
  notesSlice.actions;
export const selectNotes = (state: RootState) => state.notes.notes;
export const selectId = (state: RootState) => state.notes.notes[0].id;
