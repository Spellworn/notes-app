import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import type { Data } from "./Note.ts";

// TODO: почитать про dotEnv
const url = "https://dummyjson.com/posts";

const getRandomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  ).toISOString();
};

export const fetchNotes = createAsyncThunk("todos/fetchNotes", async () => {
  const response = await fetch(url);
  const result: Data = await response.json();

  const now = new Date();
  const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));

  const orderedNotes = result.posts.map((note) => ({
    id: nanoid(),
    title: note.title,
    body: note.body,
    date: getRandomDate(oneYearAgo, new Date()),
  }));

  return orderedNotes.slice().sort((a, b) => b.date.localeCompare(a.date));
});
