import { useCallback } from "react";
import {
  changeCurrentFolder,
  selectFolders,
} from "../../redux/foldersSlice.ts";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import { DropdownButtonFolder } from "./DropdownButtonFolder.tsx";
import styles from "../../modules/Folders.module.css";

export const Folders = () => {
  const dispatch = useAppDispatch();
  const folders = useAppSelector(selectFolders);

  const handleChangeCurrentFolder = useCallback(
    (folderName: string) => {
      dispatch(changeCurrentFolder(folderName));
    },
    [dispatch],
  );

  return (
    <>
      {folders.map((folder) => (
        <div key={folder.id} className={styles.container}>
          <button
            onClick={() => handleChangeCurrentFolder(folder.folderName)}
            className={styles.button}
          >
            {folder.folderName}
          </button>
          <DropdownButtonFolder id={folder.id} folderName={folder.folderName} />
        </div>
      ))}
    </>
  );
};
