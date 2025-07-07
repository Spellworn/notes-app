import { NotesList } from "../components/NotesList.tsx";
import { useAppDispatch, useAppSelector } from "../redux/hooks.ts";
import { useEffect } from "react";
import {
  fetchNotes,
  noteAdded,
  searchSet,
  selectNotes,
} from "../redux/notesSlice.ts";
import * as React from "react";
import styles from "../modules/NotePage.module.css";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

export const NotesPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectNotes);

  useEffect(() => {
    if (!notes || notes.length === 0) {
      dispatch(fetchNotes());
    }
  }, [dispatch, notes]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchSet(e.currentTarget.value));
  };
  const handleAddNote = () => {
    const id = nanoid();
    dispatch(noteAdded(id));
    navigate(`/notes/${id}`);
  };

  return (
    <section>
      <div className={styles.container}>
        <h2>Note App</h2>
        <button onClick={handleAddNote} className={styles.button}>
          {" "}
          Новая заметка
        </button>
        <input
          className={styles.input}
          placeholder="Поиск..."
          onChange={handleSearchChange}
        />
      </div>
      <NotesList />
    </section>
  );
};
