import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import {
  changeCurrentFolder,
  renameFolder,
  selectFolderById,
} from "../../redux/foldersSlice.ts";
import {
  selectIdsByFolder,
  updateNotesFolder,
} from "../../redux/notesSlice.ts";
import { Bounce, toast } from "react-toastify";

interface ModalWindowEditProps {
  folderName: string | undefined;
  setIsOpen: (newOpen: boolean) => void;
  setFolder: (newFolder: string) => void;
  id: string | undefined;
}

export const ModalWindowEdit = ({
  folderName,
  setIsOpen,
  setFolder,
  id,
}: ModalWindowEditProps) => {
  const dispatch = useAppDispatch();
  const folder = useAppSelector((state) => selectFolderById(state, id));
  const idsByFolder = useAppSelector(
    selectIdsByFolder(folder?.folderName ?? ""),
  );

  const handleRenameFolder = (id: string) => {
    if (folderName) {
      dispatch(renameFolder({ id, folderName: folderName }));
      dispatch(changeCurrentFolder(folderName));
      if (idsByFolder) {
        dispatch(
          updateNotesFolder({ ids: idsByFolder, folderName: folderName }),
        );
      }
      setIsOpen(false);
      setFolder("");
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
      <span>Переименовать папку</span>
      <input
        placeholder={folder?.folderName}
        onChange={(e) => setFolder(e.target.value)}
      />
      <button onClick={() => handleRenameFolder(id!)}>Ок</button>
    </>
  );
};
