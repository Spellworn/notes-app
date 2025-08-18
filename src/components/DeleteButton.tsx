import styles from "../modules/Header.module.css";
import trashButton from "../assets/trash.svg";
import { useCallback } from "react";
import { deleteNote } from "../redux/notesSlice.ts";
import { useNavigate, useParams } from "react-router-dom";
import type { NoteId } from "../redux/Note.ts";
import { useAppDispatch } from "../redux/store.ts";

export const DeleteButton = () => {
  const { id } = useParams<NoteId>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // чебурашкин колбеч
  const handleDeleteNote = useCallback(() => {
    if (id) {
      dispatch(deleteNote(id));
      navigate("/");
    }
  }, [dispatch, id, navigate]);

  return (
    <>
      <button onClick={handleDeleteNote} className={styles.button}>
        <img src={trashButton} alt="Back" />
      </button>
    </>
  );
};
