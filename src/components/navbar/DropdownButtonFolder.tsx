import {
  changeCurrentFolder,
  deleteFolder,
  selectFolderById,
  sliceSelectors,
} from "../../redux/foldersSlice.ts";
import { DropdownMenu } from "@gravity-ui/uikit";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import {
  deleteNotesByFolder,
  selectIdsByFolder,
} from "../../redux/notesSlice.ts";
import { useState } from "react";
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
  const folderToDelete = useAppSelector((state) => selectFolderById(state, id));
  const currentFolder = useAppSelector(sliceSelectors.currentFolder);

  const handleDeleteFolder = (folderId: string) => {
    dispatch(deleteFolder(folderId));
    dispatch(deleteNotesByFolder(idsByFolder));

    if (folderToDelete && folderToDelete.folderName === currentFolder) {
      dispatch(changeCurrentFolder(undefined));
    }
  };

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
