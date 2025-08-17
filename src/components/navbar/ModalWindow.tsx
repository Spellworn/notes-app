import { useAppDispatch } from "../../redux/store.ts";
import { useCallback } from "react";
import { addFolder, renameFolder } from "../../redux/foldersSlice.ts";
import styles from "../../modules/ModalAddFolder.module.css";
import { Modal } from "@gravity-ui/uikit";
import { updateNotesFolder } from "../../redux/notesSlice.ts";
import type { NoteId } from "../../redux/Note.ts";

interface ModalProps {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
  folder: string;
  setFolder: (newFolder: string) => void;
  action: "add" | "edit";
  id?: string;
  folderName?: string;
  idsByFolder?: NoteId[];
}

export const ModalWindow = ({
  open,
  setOpen,
  folder,
  setFolder,
  action,
  id,
  folderName,
  idsByFolder,
}: ModalProps) => {
  const dispatch = useAppDispatch();

  const handleAddFolder = useCallback(() => {
    if (folder) {
      dispatch(addFolder(folder));
      setOpen(false);
      setFolder("");
    } else {
      console.log("Нада сделать алерт или чет еще чтобы заполнил папку падла");
      alert("Введите название папки");
    }
  }, [dispatch, folder, setFolder, setOpen]);

  const handleRenameFolder = useCallback(
    (id: string) => {
      if (folder) {
        dispatch(renameFolder({ id, folderName: folder }));
        if (idsByFolder) {
          dispatch(updateNotesFolder({ ids: idsByFolder, folderName: folder }));
        }
        setOpen(false);
        setFolder("");
      } else {
        console.log(
          "Нада сделать алерт или чет еще чтобы заполнил папку падла",
        );
        alert("Введите название папки");
      }
    },
    [dispatch, folder, idsByFolder, setFolder, setOpen],
  );

  return (
    <Modal
      open={open}
      onOpenChange={() => setOpen(false)}
      className={styles.overlay}
    >
      <div className={styles.container}>
        {action === "add" ? (
          <span>Новая папка</span>
        ) : (
          <span>Переименовать папку</span>
        )}
        {action === "add" ? (
          <input
            placeholder={"Новая папка"}
            onChange={(e) => setFolder(e.target.value)}
          />
        ) : (
          <input
            defaultValue={folderName}
            onChange={(e) => setFolder(e.target.value)}
          />
        )}
        <button
          onClick={() => {
            if (action === "add") {
              handleAddFolder();
            } else if (action === "edit" && id) {
              handleRenameFolder(id);
            }
          }}
        >
          Ок
        </button>
        <button onClick={() => setOpen(false)}>Отменить</button>
      </div>
    </Modal>
  );
};
