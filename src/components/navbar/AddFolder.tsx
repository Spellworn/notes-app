import { useState } from "react";
import { ModalWindow } from "./ModalWindow.tsx";
import styles from "../../modules/AddFolder.module.css";

export const AddFolder = () => {
  const [open, setOpen] = useState(false);
  const [folder, setFolder] = useState("");

  return (
    <div>
      <button onClick={() => setOpen(true)} className={styles.button}>
        Новая папка
      </button>
      <ModalWindow
        open={open}
        setOpen={setOpen}
        folder={folder}
        setFolder={setFolder}
        action={"add"}
      />
    </div>
  );
};
