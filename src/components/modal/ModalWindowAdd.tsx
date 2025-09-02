import { addFolder, changeCurrentFolder } from "../../redux/foldersSlice.ts";
import { Bounce, toast } from "react-toastify";
import { useAppDispatch } from "../../redux/store.ts";

interface ModalWindowAddProps {
  folderName: string | undefined;
  setIsOpen: (newOpen: boolean) => void;
  setFolderName: (newFolder: string | undefined) => void;
}

export const ModalWindowAdd = ({
  folderName,
  setIsOpen,
  setFolderName,
}: ModalWindowAddProps) => {
  const dispatch = useAppDispatch();

  const handleAddFolder = () => {
    if (folderName) {
      dispatch(addFolder(folderName));
      dispatch(changeCurrentFolder(folderName));
      setIsOpen(false);
      setFolderName(undefined);
    } else {
      toast.error("Введите название папки", {
        position: "top-center",
        autoClose: 30000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  return (
    <>
      <span>Новая папка</span>
      <input
        placeholder={"Новая папка"}
        onChange={(e) => setFolderName(e.target.value)}
      />
      <button onClick={handleAddFolder}>Ок</button>
    </>
  );
};
