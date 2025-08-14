import styles from "../../modules/SideNavbar.module.css";
import { useState } from "react";

import { useAppSelector } from "../../redux/store.ts";
import { selectFolders } from "../../redux/foldersSlice.ts";
import { ModalAddFolder } from "./ModalAddFolder.tsx";
import { NavbarButton } from "./NavbarButton.tsx";
import * as React from "react";

interface SideNavbarProps {
  setFolder: React.Dispatch<React.SetStateAction<string>>;
}

export const SideNavbar = ({ setFolder }: SideNavbarProps) => {
  const folders = useAppSelector(selectFolders);
  const [navbar, setNavbar] = useState(false);

  return (
    <div>
      <NavbarButton navbar={navbar} setNavbar={setNavbar} />
      {navbar && (
        <div className={styles.container}>
          {folders.map((folder) => (
            <button
              key={folder.folder}
              onClick={() => setFolder(folder.folder)}
            >
              {folder.folder}
            </button>
          ))}
          <ModalAddFolder />
        </div>
      )}
    </div>
  );
};
