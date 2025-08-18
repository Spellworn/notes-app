import { useNavigate, useParams } from "react-router-dom";
// import { useState } from "react";
import { useAppSelector } from "../redux/store";
import { selectNoteById } from "../redux/notesSlice.ts";
import { NotesUpdateFields } from "../components/NotesUpdateFields.tsx";
import styles from "../modules/NoteDetail.module.css";
// import { NotesSearch } from "../components/NotesSearch.tsx";
import { Header } from "../components/Header.tsx";
import type { NoteId } from "../redux/Note.ts";

export const NoteDetail = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams<NoteId>();
  const navigate = useNavigate();

  const note = useAppSelector((state) => selectNoteById(state, id));

  return (
    <div>
      {!note && (
        <>
          <h1>Заметка не фурычит</h1>
          <button onClick={() => navigate("/")}>Обратно вернуца</button>
        </>
      )}
      {note && (
        <div>
          <Header page={"detail"} />
          {/*<NotesSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />*/}
          <div className={styles.contentContainer}>
            <NotesUpdateFields id={id} />
          </div>
        </div>
      )}
    </div>
  );
};
