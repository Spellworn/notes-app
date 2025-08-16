import { deleteFolder } from "../../redux/foldersSlice.ts";
import { DropdownMenu } from "@gravity-ui/uikit";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import {
  deleteNotesByFolder,
  selectIdsByFolder,
} from "../../redux/notesSlice.ts";
// import styles from "../../modules/DropdownButtonFolder.module.css";
import { useCallback } from "react";

interface DropdownButtonProps {
  id: string;
  folderName: string;
}

export const DropdownButtonFolder = ({
  id,
  folderName,
}: DropdownButtonProps) => {
  const dispatch = useAppDispatch();
  const idsByFolder = useAppSelector(selectIdsByFolder(folderName));

  const handleDeleteFolder = useCallback(
    (folderId: string) => {
      dispatch(deleteFolder(folderId));
      dispatch(deleteNotesByFolder(idsByFolder));
    },
    [dispatch, idsByFolder],
  );

  return (
    <>
      <DropdownMenu
        items={[
          {
            action: () => console.log("Редактирование"),
            text: "Переименовать",
          },
          {
            action: () => handleDeleteFolder(id),
            text: "Удалить папку",
            theme: "danger",
          },
        ]}
      />
    </>
  );
};
