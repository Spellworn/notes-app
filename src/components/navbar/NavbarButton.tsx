import styles from "../../modules/NavbarButton.module.css";
import * as React from "react";
import menuButton from "../../assets/menu.svg";

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
        <img src={menuButton} alt="Back" />
      </button>
    </div>
  );
};
