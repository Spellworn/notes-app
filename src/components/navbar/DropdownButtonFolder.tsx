import {
  changeCurrentFolder,
  deleteFolder,
  selectCurrentFolder,
  selectFolderById,
} from "../../redux/foldersSlice.ts";
import { DropdownMenu } from "@gravity-ui/uikit";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import {
  deleteNotesByFolder,
  selectIdsByFolder,
} from "../../redux/notesSlice.ts";
import { useCallback, useState } from "react";
import { ModalWindow } from "../modal/ModalWindow.tsx";
import styles from "../../modules/DropdownButtonFolder.module.css";

interface DropdownButtonProps {
  id: string;
  folderName: string;
}

export const DropdownButtonFolder = ({
  id,
  folderName,
}: DropdownButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();
  const idsByFolder = useAppSelector(selectIdsByFolder(folderName));
  const folder = useAppSelector((state) => selectFolderById(state, id));
  const currentFolder = useAppSelector(selectCurrentFolder);

  const handleDeleteFolder = useCallback(
    (folderId: string) => {
      dispatch(deleteFolder(folderId));
      dispatch(deleteNotesByFolder(idsByFolder));

      if (folder && folder.folderName === currentFolder) {
        dispatch(changeCurrentFolder(undefined));
      }
    },
    [currentFolder, dispatch, folder, idsByFolder],
  );

  return (
    <>
      <DropdownMenu
        switcherWrapperClassName={styles.dropdown}
        items={[
          {
            action: () => setIsOpen(true),
            text: "Переименовать",
          },
          {
            action: () => handleDeleteFolder(id),
            text: "Удалить папку",
            theme: "danger",
          },
        ]}
      />
      {isOpen && (
        <ModalWindow
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          action={"edit"}
          id={id}
        />
      )}
    </>
  );
};
