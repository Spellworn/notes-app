import styles from "../../modules/SideNavbar.module.css";
import { useState } from "react";

import { ModalAddFolder } from "./ModalAddFolder.tsx";
import { NavbarButton } from "./NavbarButton.tsx";
import { Folders } from "./Folders.tsx";

export const SideNavbar = () => {
  const [navbar, setNavbar] = useState(true);

  return (
    <div>
      <NavbarButton navbar={navbar} setNavbar={setNavbar} />
      {navbar && (
        <div className={styles.container}>
          <Folders />
          <ModalAddFolder />
        </div>
      )}
    </div>
  );
};
