import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import type { Data } from "./Note.ts";

const url = import.meta.env.VITE_REACT_APP_API_KEY;

const getRandomDate = () => {
  const now = new Date();
  const oneYearAgo = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate(),
  );

  return new Date(
    oneYearAgo.getTime() +
      Math.random() * (now.getTime() - oneYearAgo.getTime()),
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
    folder: "Заметки",
  }));

  return orderedNotes.slice().sort((a, b) => b.date.localeCompare(a.date));
});
