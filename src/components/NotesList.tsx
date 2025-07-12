import { selectSearchedItems } from "../redux/notesSlice.ts";
import { Notes } from "./Notes.tsx";
import styles from "../modules/NotesList.module.css";
import { useAppSelector } from "../redux/store.ts";
import { NotesSearch } from "./NotesSearch.tsx";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce.ts";

export const NotesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 5000);
  // TODO: сортировка по дате в селектор

  const notesIds = useAppSelector(selectSearchedItems(debouncedSearchTerm));

  return (
    <>
      <div className={styles.container}>
        <NotesSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <ul className={styles.notesWrapper}>
        {notesIds.map((noteId) => (
          <Notes id={noteId} key={noteId} />
        ))}
      </ul>
    </>
  );
};
