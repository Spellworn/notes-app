import { useMemo } from "react";
import { selectNoteById, updateFolder } from "../redux/notesSlice.ts";
import {
  changeCurrentFolder,
  foldersAdapterSelectors,
} from "../redux/foldersSlice.ts";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { useParams } from "react-router-dom";
import type { NoteId } from "../redux/Note.ts";

export const useDropdownItems = () => {
  const folders = useAppSelector(foldersAdapterSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { id } = useParams<NoteId>();
  const note = useAppSelector((state) => selectNoteById(state, id));

  return useMemo(
    () =>
      folders
        .filter((folder) => folder.folderName !== note?.folder)
        .map((folder) => ({
          text: folder.folderName,
          action: () => {
            dispatch(updateFolder({ id, folder: folder.folderName }));
            dispatch(changeCurrentFolder(folder.folderName));
          },
        })),
    [dispatch, folders, id, note?.folder],
  );
};
