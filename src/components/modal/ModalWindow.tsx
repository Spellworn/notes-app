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
  const [folderName, setFolderName] = useState<string | undefined>(undefined);

  const modalWindowChoice = () => {
    switch (action) {
      case "add":
        return (
          <ModalWindowAdd
            folderName={folderName}
            setIsOpen={setIsOpen}
            setFolderName={setFolderName}
          />
        );
      case "edit":
        return (
          <ModalWindowEdit
            folderName={folderName}
            setIsOpen={setIsOpen}
            setFolderName={setFolderName}
            id={id}
          />
        );
    }
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={() => setIsOpen(false)}
      className={styles.overlay}
    >
      <div className={styles.container}>
        {modalWindowChoice()}
        <button onClick={() => setIsOpen(false)}>Отменить</button>
      </div>
    </Modal>
  );
};
