import styles from "../../modules/SideNavbar.module.css";
import * as React from "react";

interface NavbarButtonProps {
  navbar: boolean;
  setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavbarButton = ({ navbar, setNavbar }: NavbarButtonProps) => {
  const changeNavbar = () => {
    setNavbar(!navbar);
  };

  return (
    <div className={styles.buttonContainer}>
      <button onClick={changeNavbar} className={styles.navbarButton}>
        навбар
      </button>
    </div>
  );
};
