import { useCallback, useState } from "react";
import { addFolder } from "../../redux/foldersSlice.ts";
import { useAppDispatch } from "../../redux/store.ts";
import { Button, Modal } from "@gravity-ui/uikit";
import styles from "../../modules/ModalAddFolder.module.css";

export const ModalAddFolder = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [folder, setFolder] = useState("");

  const handleAddFolder = useCallback(() => {
    if (folder) {
      dispatch(addFolder(folder));
      setOpen(false);
      setFolder("");
    } else {
      console.log("Нада сделать алерт или чет еще чтобы заполнил папку падла");
      alert("Введите название папки");
    }
  }, [dispatch, folder]);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Новая папка</Button>
      <Modal
        open={open}
        onOpenChange={() => setOpen(false)}
        className={styles.overlay}
      >
        <div className={styles.container}>
          <span>Новая папка</span>
          <input
            placeholder={"Новая папка"}
            onChange={(e) => setFolder(e.target.value)}
          />
          <button
            onClick={() => {
              handleAddFolder();
            }}
          >
            Ок
          </button>
          <button onClick={() => setOpen(false)}>Отменить</button>
        </div>
      </Modal>
    </div>
  );
};
