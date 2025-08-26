import styles from "../modules/Header.module.css";
import { AsideNavbar } from "./navbar/AsideNavbar.tsx";
import backButton from "../assets/backButton.svg";
import { NotesAdd } from "./NotesAdd.tsx";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteButton } from "./DeleteButton.tsx";
import { DropdownChangeNoteFolder } from "./DropdownChangeNoteFolder.tsx";

interface HeaderProps {
  page: "main" | "detail";
}

export const Header = ({ page }: HeaderProps) => {
  const [navbar, setNavbar] = useState(true);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.navbarContainer}>
        <AsideNavbar navbar={navbar} setNavbar={setNavbar} />
      </div>
      {page === "detail" && (
        <button
          onClick={() => navigate("/")}
          className={navbar ? styles.buttonOpen : styles.backButton}
        >
          <img src={backButton} alt="Back" />
        </button>
      )}
      <div className={styles.middleSection}>
        {page === "main" && <NotesAdd />}
        {page === "detail" && (
          <>
            <DeleteButton />
            <div className={styles.endSection}>
              <DropdownChangeNoteFolder />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
