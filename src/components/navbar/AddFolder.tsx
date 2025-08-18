import { useState } from "react";
import { ModalWindow } from "./ModalWindow.tsx";
import styles from "../../modules/AddFolder.module.css";

export const AddFolder = () => {
  // chore: isOpen
  const [open, setOpen] = useState(false);
  // chore: folderName
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
