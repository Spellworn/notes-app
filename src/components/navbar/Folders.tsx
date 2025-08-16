import { useCallback } from "react";
import {
  changeCurrentFolder,
  selectFolders,
} from "../../redux/foldersSlice.ts";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import { DropdownButtonFolder } from "./DropdownButtonFolder.tsx";

export const Folders = () => {
  const dispatch = useAppDispatch();
  const folders = useAppSelector(selectFolders);

  const handleChangeCurrentFolder = useCallback(
    (folderName: string) => {
      dispatch(changeCurrentFolder(folderName));
    },
    [dispatch],
  );

  return (
    <>
      {folders.map((folder) => (
        <div key={folder.id}>
          <button onClick={() => handleChangeCurrentFolder(folder.folderName)}>
            {folder.folderName}
          </button>
          <DropdownButtonFolder id={folder.id} folderName={folder.folderName} />
        </div>
      ))}
    </>
  );
};
