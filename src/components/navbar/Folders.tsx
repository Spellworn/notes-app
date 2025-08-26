import { useCallback } from "react";
import {
  changeCurrentFolder,
  selectCurrentFolder,
  selectFolders,
} from "../../redux/foldersSlice.ts";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import { DropdownButtonFolder } from "./DropdownButtonFolder.tsx";
import styles from "../../modules/Folders.module.css";
import { useNavigate, useParams } from "react-router-dom";
import type { NoteId } from "../../redux/Note.ts";
import type { CurrentFolderType } from "../../redux/Folder.ts";

export const Folders = () => {
  const activeFolder = useAppSelector(selectCurrentFolder);
  const dispatch = useAppDispatch();
  const folders = useAppSelector(selectFolders);
  const { id } = useParams<NoteId>();

  const navigate = useNavigate();

  const handleChangeCurrentFolder = useCallback(
    (folderName: CurrentFolderType) => {
      dispatch(changeCurrentFolder(folderName));
      if (id) {
        navigate("/");
      }
    },
    [dispatch, id, navigate],
  );

  return (
    <div>
      <button
        onClick={() => handleChangeCurrentFolder(undefined)}
        className={
          activeFolder === undefined ? styles.buttonActive : styles.button
        }
      >
        Все заметки
      </button>
      {folders.map((folder) => (
        <div key={folder.id} className={styles.container}>
          <button
            onClick={() => handleChangeCurrentFolder(folder.folderName)}
            className={
              activeFolder === folder.folderName
                ? styles.buttonActive
                : styles.button
            }
          >
            {folder.folderName}
          </button>
          <DropdownButtonFolder id={folder.id} folderName={folder.folderName} />
        </div>
      ))}
    </div>
  );
};
