import { selectSearchedItems } from "../redux/notesSlice.ts";
import { Notes } from "./Notes.tsx";
import styles from "../modules/NotesList.module.css";
import { useAppSelector } from "../redux/store.ts";
import { NotesSearch } from "./NotesSearch.tsx";

export const NotesList = () => {
  // TODO: сортировка по дате в селектор
  const notesIds = useAppSelector(selectSearchedItems);

  return (
    <>
      <div className={styles.container}>
        <NotesSearch />
      </div>
      <ul className={styles.notesWrapper}>
        {notesIds.map((noteId) => (
          <Notes id={noteId} key={noteId} />
        ))}
      </ul>
    </>
  );
};
