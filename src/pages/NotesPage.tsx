import { NotesList } from "../components/NotesList.tsx";
import { useEffect, useState } from "react";
import styles from "../modules/NotePage.module.css";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { adapterSelectors } from "../redux/notesSlice.ts";
import { fetchNotes } from "../redux/thunks.ts";

import { NotesAdd } from "../components/NotesAdd.tsx";
import { SideNavbar } from "../components/navbar/SideNavbar.tsx";

export const NotesPage = () => {
  const dispatch = useAppDispatch();
  const [folder, setFolder] = useState("");
  console.log(folder);

  const notes = useAppSelector(adapterSelectors.selectAll);
  // TODO: в чем разница между || и ??
  useEffect(() => {
    if (notes.length === 0) {
      dispatch(fetchNotes());
    }
  }, [dispatch, notes]);

  return (
    <div className={styles.sideNavbar}>
      <SideNavbar setFolder={setFolder} />

      <div className={styles.container}>
        <h2>Note App</h2>
        <NotesAdd folder={folder} />

        <NotesList folder={folder} />
      </div>
    </div>
  );
};
