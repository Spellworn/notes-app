import { useState } from "react";
import { ModalWindow } from "../modal/ModalWindow.tsx";
import styles from "../../modules/AddFolder.module.css";

export const AddFolder = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className={styles.button}>
        Новая папка
      </button>
      <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} action={"add"} />
    </div>
  );
};
