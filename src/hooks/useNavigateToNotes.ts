import { useNavigate } from "react-router-dom";

type UseNavigateToNotesProps = string;

export const useNavigateToNotes = (id: UseNavigateToNotesProps) => {
  const navigate = useNavigate();

  return () => navigate(`/notes/${id}`);
};
