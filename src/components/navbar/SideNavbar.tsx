import styles from "../../modules/SideNavbar.module.css";

import { AddFolder } from "./AddFolder.tsx";
import { NavbarButton } from "./NavbarButton.tsx";
import { Folders } from "./Folders.tsx";
import * as React from "react";

interface SideNavbarProps {
  navbar: boolean;
  setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

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
