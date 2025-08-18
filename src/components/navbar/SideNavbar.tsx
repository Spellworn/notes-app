import styles from "../../modules/SideNavbar.module.css";

import { AddFolder } from "./AddFolder.tsx";
import { NavbarButton } from "./NavbarButton.tsx";
import { Folders } from "./Folders.tsx";
import type { Dispatch, SetStateAction } from "react";

interface SideNavbarProps {
  navbar: boolean;
  setNavbar: Dispatch<SetStateAction<boolean>>;
}

// может все таки AsideNavbar
export const SideNavbar = ({ navbar, setNavbar }: SideNavbarProps) => {
  return (
    <>
      {!navbar && <NavbarButton navbar={navbar} setNavbar={setNavbar} />}
      {navbar && (
        <div className={styles.container}>
          <div className={styles.topSection}>
            <NavbarButton navbar={navbar} setNavbar={setNavbar} />
          </div>
          <div className={styles.middleSection}>
            <Folders />
          </div>
          <div className={styles.bottomSection}>
            <AddFolder />
          </div>
        </div>
      )}
    </>
  );
};
