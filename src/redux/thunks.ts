import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import type { Data } from "./Note.ts";

// TODO: почитать про dotEnv
const url = "https://dummyjson.com/posts";

const getRandomDate = () => {
  const now = new Date();
  const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
  return new Date(
    now.getTime() + Math.random() * (oneYearAgo.getTime() - now.getTime()),
  ).toISOString();
};

export const fetchNotes = createAsyncThunk("todos/fetchNotes", async () => {
  const response = await fetch(url);
  const result: Data = await response.json();

  const orderedNotes = result.posts.map((note) => ({
    id: nanoid(),
    title: note.title,
    body: note.body,
    date: getRandomDate(),
  }));

  return orderedNotes.slice().sort((a, b) => b.date.localeCompare(a.date));
});
