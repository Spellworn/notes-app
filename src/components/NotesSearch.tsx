import { type ChangeEventHandler, useEffect, useState } from "react";
import { setSearch } from "../redux/notesSlice.ts";
import { useAppDispatch } from "../redux/store.ts";
import styles from "../modules/NotePage.module.css";
import { useDebounce } from "../hooks/useDebounce.ts";

export const NotesSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  const dispatch = useAppDispatch();

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.currentTarget.value);
  };

  useEffect(() => {
    dispatch(setSearch(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  return (
    <input
      className={styles.input}
      placeholder="Поиск..."
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
};
