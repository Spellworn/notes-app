import styles from "../../modules/SideNavbar.module.css";
import { useCallback, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import {
  changeCurrentFolder,
  selectFolders,
} from "../../redux/foldersSlice.ts";
import { ModalAddFolder } from "./ModalAddFolder.tsx";
import { NavbarButton } from "./NavbarButton.tsx";

export const SideNavbar = () => {
  const dispatch = useAppDispatch();
  const folders = useAppSelector(selectFolders);
  const [navbar, setNavbar] = useState(true);

  const handleChangeCurrentFolder = useCallback(
    (folderName: string) => {
      dispatch(changeCurrentFolder(folderName));
    },
    [dispatch],
  );

  return (
    <div>
      <NavbarButton navbar={navbar} setNavbar={setNavbar} />
      {navbar && (
        <div className={styles.container}>
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => handleChangeCurrentFolder(folder.folderName)}
            >
              {folder.folderName}
            </button>
          ))}
          <ModalAddFolder />
        </div>
      )}
    </div>
  );
};
