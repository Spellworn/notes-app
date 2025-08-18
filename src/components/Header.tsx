import styles from "../modules/Header.module.css";
import { SideNavbar } from "./navbar/SideNavbar.tsx";
import backButton from "../assets/backButton.svg";
import { NotesAdd } from "./NotesAdd.tsx";
import trashButton from "../assets/trash.svg";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { NoteId } from "../redux/Note.ts";
import { useAppDispatch } from "../redux/store.ts";
import { deleteNote } from "../redux/notesSlice.ts";

interface HeaderProps {
  page: "main" | "detail";
}

export const Header = ({ page }: HeaderProps) => {
  const [navbar, setNavbar] = useState(true);
  const { id } = useParams<NoteId>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDeleteNote = useCallback(() => {
    if (id) {
      dispatch(deleteNote(id));
      navigate("/");
    }
  }, [dispatch, id, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.navbarContainer}>
        <SideNavbar navbar={navbar} setNavbar={setNavbar} />
      </div>
      {page === "detail" && (
        <button
          onClick={() => navigate("/")}
          className={navbar ? styles.buttonOpen : styles.backButton}
        >
          <img src={backButton} alt="Back" />
        </button>
      )}
      <div className={styles.middleSection}>
        {page === "main" && <NotesAdd />}

        {page === "detail" && (
          <button onClick={handleDeleteNote} className={styles.button}>
            <img src={trashButton} alt="Back" />
          </button>
        )}
      </div>
    </div>
  );
};
