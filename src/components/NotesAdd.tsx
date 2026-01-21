import { nanoid } from "@reduxjs/toolkit";
import { addNote } from "../redux/notesSlice.ts";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { useNavigate } from "react-router-dom";
import styles from "../modules/NotesAdd.module.css";
import addButton from "../assets/addButton.svg";
import { sliceSelectors } from "../redux/foldersSlice.ts";

export const NotesAdd = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentFolder = useAppSelector(sliceSelectors.currentFolder);

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
