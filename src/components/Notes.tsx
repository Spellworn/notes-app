import styles from "../modules/Notes.module.css";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { type Notes as NotesProps } from "../redux/Note.ts";
import { useAppSelector } from "../redux/store.ts";
import { adapterSelectors } from "../redux/notesSlice.ts";

const useNavigateToNotes = (id: NotesProps["id"]) => {
  const navigate = useNavigate();

  return () => navigate(`/notes/${id}`);
};

const getFormattedDate = (date: string) => {
  const timePeriod = formatDistanceToNow(date);

  return `${timePeriod} ago`;
};

export const Notes = ({ id }: Pick<NotesProps, "id">) => {
  const { date, body, title } = useAppSelector((state) =>
    adapterSelectors.selectById(state, id),
  );
  const navigate = useNavigateToNotes(id);
  const formattedDate = getFormattedDate(date);

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
