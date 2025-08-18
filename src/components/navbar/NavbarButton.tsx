import styles from "../../modules/NavbarButton.module.css";
import menuButton from "../../assets/menu.svg";
import type { Dispatch, SetStateAction } from "react";

interface NavbarButtonProps {
  navbar: boolean;
  // setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
  // vite итак уже знает что ты в реакте
  setNavbar: Dispatch<SetStateAction<boolean>>;
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
