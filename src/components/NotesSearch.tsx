import { type ChangeEventHandler } from "react";

import styles from "../modules/NotePage.module.css";

interface NotesSearchProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const NotesSearch = ({
  searchTerm,
  setSearchTerm,
}: NotesSearchProps) => {
  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.currentTarget.value);
  };

  return (
    <input
      className={styles.input}
      placeholder="Поиск..."
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
};
