import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { deleteNote, selectNoteById } from "../redux/notesSlice.ts";
import type { NoteId } from "../redux/Note.ts";
import { NotesUpdateFields } from "../components/NotesUpdateFields.tsx";
import styles from "../modules/NoteDetail.module.css";
import { SideNavbar } from "../components/navbar/SideNavbar.tsx";
import backButton from "../assets/backButton.svg";
import trashButton from "../assets/trash.svg";

export const NoteDetail = () => {
  const { id } = useParams<NoteId>();
  const note = useAppSelector((state) => selectNoteById(state, id));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDeleteNote = useCallback(() => {
    if (id) {
      dispatch(deleteNote(id));
      navigate("/");
    }
  }, [dispatch, id, navigate]);

  return (
    <div>
      {!note && (
        <>
          <h1>Заметка не фурычит</h1>
          <button onClick={() => navigate("/")}>Обратно вернуца</button>
        </>
      )}
      {note && (
        <div className={styles.container}>
          <SideNavbar />
          <button onClick={() => navigate("/")} className={styles.buttonBack}>
            <img src={backButton} alt="Back" />
          </button>
          <button onClick={handleDeleteNote} className={styles.buttonTrash}>
            <img src={trashButton} alt="Back" />
          </button>
          <div className={styles.contentContainer}>
            <NotesUpdateFields id={id} />
          </div>
        </div>
      )}
    </div>
  );
};
