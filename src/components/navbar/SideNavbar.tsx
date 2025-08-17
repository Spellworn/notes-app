import styles from "../../modules/SideNavbar.module.css";
import { useState } from "react";

import { AddFolder } from "./AddFolder.tsx";
import { NavbarButton } from "./NavbarButton.tsx";
import { Folders } from "./Folders.tsx";

export const SideNavbar = () => {
  const [navbar, setNavbar] = useState(true);

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
