import styles from "../modules/Notes.module.css";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

interface NotesProps {
  id: string;
  title: string;
  body: string;
  date: string;
}

export const Notes = ({ id, title, body, date }: NotesProps) => {
  const navigate = useNavigate();

  const timePeriod = formatDistanceToNow(date);
  const timeAgo = `${timePeriod} ago`;

  const handleClick = () => {
    navigate(`/notes/${id}`);
  };

  return (
    <>
      <button className={styles.block} onClick={handleClick}>
        <h4 className={styles.title}>{title}</h4>
        <span className={styles.text}>{body}</span>
        <span className={styles.date}>{timeAgo}</span>
      </button>
    </>
  );
};
