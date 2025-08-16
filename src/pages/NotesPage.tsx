import { NotesList } from "../components/NotesList.tsx";
import { useEffect } from "react";
import styles from "../modules/NotePage.module.css";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { adapterSelectors } from "../redux/notesSlice.ts";
import { fetchNotes } from "../redux/thunks.ts";

import { NotesAdd } from "../components/NotesAdd.tsx";
import { SideNavbar } from "../components/navbar/SideNavbar.tsx";

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
    <div className={styles.sideNavbar}>
      <SideNavbar />

      <div className={styles.container}>
        <h2>Note App</h2>
        <NotesAdd />

        <NotesList />
      </div>
    </div>
  );
};
