import { selectSearchedItems } from "../redux/notesSlice.ts";
import { Notes } from "./Notes.tsx";
import styles from "../modules/NotesList.module.css";

import { useAppSelector } from "../redux/hooks.ts";

export const NotesList = () => {
  const notes = useAppSelector(selectSearchedItems);
  return (
    <ul className={styles.notesWrapper}>
      {notes.map((note) => (
        <Notes
          id={note.id}
          title={note.title}
          body={note.body}
          key={note.id}
          date={note.date}
        />
      ))}
    </ul>
  );
};
