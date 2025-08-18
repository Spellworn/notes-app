import { NotesList } from "../components/NotesList.tsx";
import { useEffect } from "react";
import styles from "../modules/NotePage.module.css";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { adapterSelectors } from "../redux/notesSlice.ts";
import { fetchNotes } from "../redux/thunks.ts";
import { Header } from "../components/Header.tsx";

export const NotesPage = () => {
  const dispatch = useAppDispatch();

  const notes = useAppSelector(adapterSelectors.selectAll);
  // TODO: в чем разница между || и ??
  useEffect(() => {
    if (notes.length === 0) {
      dispatch(fetchNotes());
    }
  }, [dispatch, notes]);

  return (
    <div className={styles.container}>
      <Header page={"main"} />
      <NotesList />
    </div>
  );
};
