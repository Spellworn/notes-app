import { NotesList } from "../components/NotesList.tsx";
import { useEffect } from "react";
import styles from "../modules/NotePage.module.css";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { adapterSelectors } from "../redux/notesSlice.ts";
import { fetchNotes } from "../redux/thunks.ts";

import { NotesAdd } from "../components/NotesAdd.tsx";

export const NotesPage = () => {
  const dispatch = useAppDispatch();

  const notes = useAppSelector(adapterSelectors.selectAll);

  useEffect(() => {
    // чтобы не слетала дата
    if (!notes || notes.length === 0) {
      dispatch(fetchNotes());
    }
  }, [dispatch, notes]);

  // TODO: вот отдельный компач✅

  return (
    <section>
      <div className={styles.container}>
        <h2>Note App</h2>
        <NotesAdd />
        {/*TODO: прикрутить дебаунс */}
      </div>
      <NotesList />
    </section>
  );
};
