import { deleteFolder, renameFolder } from "../../redux/foldersSlice.ts";
import { DropdownMenu, Modal } from "@gravity-ui/uikit";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import {
  deleteNotesByFolder,
  selectIdsByFolder,
  updateNotesFolder,
} from "../../redux/notesSlice.ts";
// import styles from "../../modules/DropdownButtonFolder.module.css";
import { useCallback, useState } from "react";
import styles from "../../modules/ModalAddFolder.module.css";

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
      dispatch(deleteNotesByFolder(idsByFolder));
    },
    [dispatch, idsByFolder],
  );

  const handleRenameFolder = useCallback(
    (id: string) => {
      if (folder) {
        dispatch(renameFolder({ id, folderName: folder }));
        dispatch(updateNotesFolder({ ids: idsByFolder, folderName: folder }));
        setOpen(false);
        setFolder("");
      } else {
        console.log(
          "Нада сделать алерт или чет еще чтобы заполнил папку падла",
        );
        alert("Введите название папки");
      }
    },
    [dispatch, folder, idsByFolder],
  );

  return (
    <>
      <DropdownMenu
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
        <Modal
          open={open}
          onOpenChange={() => setOpen(false)}
          className={styles.overlay}
        >
          <div className={styles.container}>
            <span>Переименовать папку</span>
            <input
              defaultValue={folderName}
              onChange={(e) => setFolder(e.target.value)}
            />
            <button
              onClick={() => {
                handleRenameFolder(id);
              }}
            >
              Ок
            </button>
            <button onClick={() => setOpen(false)}>Отменить</button>
          </div>
        </Modal>
      )}
    </>
  );
};
