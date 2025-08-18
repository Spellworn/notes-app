import { nanoid } from "@reduxjs/toolkit";
import { addNote } from "../redux/notesSlice.ts";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { useNavigate } from "react-router-dom";
import styles from "../modules/NotesAdd.module.css";
import { selectCurrentFolder } from "../redux/foldersSlice.ts";
import addButton from "../assets/addButton.svg";

export const NotesAdd = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentFolder = useAppSelector(selectCurrentFolder);

  const handleAddNote = () => {
    const id = nanoid();
    dispatch(addNote({ id, folder: currentFolder }));
    navigate(`/notes/${id}`);
  };

  return (
    <button onClick={handleAddNote} className={styles.button}>
      <img src={addButton} alt="Back" />
    </button>
  );
};
