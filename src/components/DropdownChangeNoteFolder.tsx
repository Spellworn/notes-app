import { selectNoteById, updateFolder } from "../redux/notesSlice.ts";
import {
  changeCurrentFolder,
  foldersAdapterSelectors,
} from "../redux/foldersSlice.ts";
import { DropdownMenu } from "@gravity-ui/uikit";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { useParams } from "react-router-dom";
import type { NoteId } from "../redux/Note.ts";
import styles from "../modules/DropdownChangeNoteFolder.module.css";

export const DropdownChangeNoteFolder = () => {
  const folders = useAppSelector((state) =>
    foldersAdapterSelectors.selectAll({ folders: state.folder }),
  );
  const dispatch = useAppDispatch();
  const { id } = useParams<NoteId>();
  const note = useAppSelector((state) => selectNoteById(state, id));

  {
    /* потенциально уязвимое по перфомансу место, на каждлый рендер новый массив обьектов, c магией внутри */
  }
  return (
    <DropdownMenu
      switcherWrapperClassName={styles.dropdown}
      items={[
        {
          text: "Переместить в другую папку",
          items: folders
            .filter((folder) => folder.folderName !== note?.folder)
            .map((folder) => ({
              text: folder.folderName,
              action: () => {
                dispatch(updateFolder({ id, folder: folder.folderName }));
                dispatch(changeCurrentFolder(folder.folderName));
              },
            })),
        },
      ]}
    />
  );
};
