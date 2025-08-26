import styles from "../modules/Notes.module.css";
import { type Notes as NotesProps } from "../redux/Note.ts";
import { useAppSelector } from "../redux/store.ts";
import { selectNoteById } from "../redux/notesSlice.ts";
import { useNavigateToNotes } from "../hooks/useNavigateToNotes.ts";
import { getFormattedDate } from "../functions/getFormattedDate.ts";

// в отдельный тип (не понял)
export const Notes = ({ id }: Pick<NotesProps, "id">) => {
  const note = useAppSelector((state) => selectNoteById(state, id));
  const { date, title, body } = note ?? {};
  const navigate = useNavigateToNotes(id);
  const formattedDate = getFormattedDate(date!);

  return (
    <li>
      <button className={styles.block} onClick={navigate}>
        <h4 className={styles.title}>{title}</h4>
        <span className={styles.text}>{body}</span>
        <span className={styles.date}>{formattedDate}</span>
      </button>
    </li>
  );
};
