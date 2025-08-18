import { deleteFolder } from "../../redux/foldersSlice.ts";
import { DropdownMenu } from "@gravity-ui/uikit";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import {
  deleteNotesByFolder,
  selectIdsByFolder,
} from "../../redux/notesSlice.ts";
import { useCallback, useState } from "react";
import { ModalWindow } from "./ModalWindow.tsx";
import styles from "../../modules/DropdownButtonFolder.module.css";

interface DropdownButtonProps {
  id: string;
  folderName: string;
}

export const DropdownButtonFolder = ({
  id,
  folderName,
}: DropdownButtonProps) => {
  const [open, setOpen] = useState(false);
  const [folder, setFolder] = useState("");
  const dispatch = useAppDispatch();
  const idsByFolder = useAppSelector(selectIdsByFolder(folderName));

  const handleDeleteFolder = useCallback(
    (folderId: string) => {
      dispatch(deleteFolder(folderId));
      // question: а почему заметки удаляются при удалении папки
      dispatch(deleteNotesByFolder(idsByFolder));
    },
    [dispatch, idsByFolder],
  );

  return (
    <>
      <DropdownMenu
        switcherWrapperClassName={styles.dropdown}
        items={[
          {
            action: () => setOpen(true),
            text: "Переименовать",
          },
          {
            action: () => handleDeleteFolder(id),
            text: "Удалить папку",
            theme: "danger",
          },
        ]}
      />
      {open && (
        <ModalWindow
          open={open}
          setOpen={setOpen}
          folder={folder}
          setFolder={setFolder}
          action={"edit"}
          id={id}
          folderName={folderName}
          idsByFolder={idsByFolder}
        />
      )}
    </>
  );
};
