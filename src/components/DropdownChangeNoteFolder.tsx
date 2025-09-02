import { DropdownMenu } from "@gravity-ui/uikit";
import styles from "../modules/DropdownChangeNoteFolder.module.css";
import { useDropdownItems } from "../hooks/useDropdownItems.ts";

export const DropdownChangeNoteFolder = () => {
  return (
    <DropdownMenu
      switcherWrapperClassName={styles.dropdown}
      items={[
        {
          text: "Переместить в другую папку",
          items: useDropdownItems(),
        },
      ]}
    />
  );
};
