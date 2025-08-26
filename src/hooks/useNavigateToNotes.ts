import type { Notes as NotesProps } from "../redux/Note.ts";
import { useNavigate } from "react-router-dom";

export const useNavigateToNotes = (id: NotesProps["id"]) => {
  const navigate = useNavigate();

  return () => navigate(`/notes/${id}`);
};
