import { selectSearchedItems } from "../redux/notesSlice.ts";
import { Notes } from "./Notes.tsx";
import styles from "../modules/NotesList.module.css";
import { useAppSelector } from "../redux/store.ts";

export const NotesList = () => {
  // TODO: сортировка по дате в селектор
  const notesIds = useAppSelector(selectSearchedItems);

  return (
    <ul className={styles.notesWrapper}>
      {notesIds.map((noteId) => (
        <Notes id={noteId} key={noteId} />
      ))}
    </ul>
  );
};
