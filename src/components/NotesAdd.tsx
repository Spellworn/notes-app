import { nanoid } from "@reduxjs/toolkit";
import { addNote } from "../redux/notesSlice.ts";
import { useAppDispatch } from "../redux/store.ts";
import { useNavigate } from "react-router-dom";
import styles from "../modules/NotePage.module.css";

export const NotesAdd = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddNote = () => {
    const id = nanoid();
    dispatch(addNote(id));
    navigate(`/notes/${id}`);
  };

  return (
    <button onClick={handleAddNote} className={styles.button}>
      Новая заметка
    </button>
  );
};
