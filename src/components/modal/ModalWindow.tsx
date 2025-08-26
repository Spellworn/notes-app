import styles from "../../modules/ModalAddFolder.module.css";
import { Modal } from "@gravity-ui/uikit";
import { useState } from "react";
import { ModalWindowAdd } from "./ModalWindowAdd.tsx";
import { ModalWindowEdit } from "./ModalWindowEdit.tsx";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (newOpen: boolean) => void;
  action: "add" | "edit";
  id?: string;
}

export const ModalWindow = ({ isOpen, setIsOpen, action, id }: ModalProps) => {
  const [folderName, setFolderName] = useState("");

  return (
    <Modal
      open={isOpen}
      onOpenChange={() => setIsOpen(false)}
      className={styles.overlay}
    >
      <div className={styles.container}>
        {action === "add" ? (
          <ModalWindowAdd
            folderName={folderName}
            setIsOpen={setIsOpen}
            setFolderName={setFolderName}
          />
        ) : (
          <ModalWindowEdit
            folderName={folderName}
            setIsOpen={setIsOpen}
            setFolder={setFolderName}
            id={id}
          />
        )}
        <button onClick={() => setIsOpen(false)}>Отменить</button>
      </div>
    </Modal>
  );
};
