import { NotesList } from "../components/NotesList.tsx";
import { type ChangeEventHandler, useEffect } from "react";
import styles from "../modules/NotePage.module.css";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { adapterSelectors, notesActions } from "../redux/notesSlice.ts";
import { fetchNotes } from "../redux/thunks.ts";

export const NotesPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const notes = useAppSelector(adapterSelectors.selectAll);

  useEffect(() => {
    // чтобы не слетала дата
    if (!notes || notes.length === 0) {
      dispatch(fetchNotes());
    }
  }, [dispatch, notes]);

  // TODO: в отдельный компач
  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(notesActions.setSearch(e.currentTarget.value));
  };

  // TODO: вот отдельный компач
  const handleAddNote = () => {
    const id = nanoid();
    dispatch(notesActions.addNote(id));
    navigate(`/notes/${id}`);
  };

  return (
    <section>
      <div className={styles.container}>
        <h2>Note App</h2>
        <button onClick={handleAddNote} className={styles.button}>
          Новая заметка
        </button>
        {/*TODO: прикрутить дебаунс */}
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
