import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import {
  selectNoteById,
  updateBody,
  updateTitle,
} from "../redux/notesSlice.ts";
import type { NoteId } from "../redux/Note.ts";
import { useDebounce } from "../hooks/useDebounce.ts";
import { TextArea } from "@gravity-ui/uikit";
import styles from "../modules/NotesUpdateFields.module.css";

interface NotesUpdateFieldsProps {
  id: NoteId | undefined;
}

export const NotesUpdateFields = ({ id }: NotesUpdateFieldsProps) => {
  const dispatch = useAppDispatch();
  const note = useAppSelector((state) => selectNoteById(state, id));
  const [updatedBodyTerm, setUpdatedBodyTerm] = useState(note?.body);
  const [updatedTitleTerm, setUpdatedTitleTerm] = useState(note?.title);

  const handleTitleUpdate = useCallback(
    (text: string | undefined) => {
      if (id) {
        dispatch(updateTitle({ id, text }));
      }
    },
    [dispatch, id],
  );

  const handleBodyUpdate = useCallback(
    (text: string | undefined) => {
      if (id) {
        dispatch(updateBody({ id, text }));
      }
    },
    [dispatch, id],
  );

  const debouncedTitleTerm = useDebounce(updatedTitleTerm, 500);
  const debouncedBodyTerm = useDebounce(updatedBodyTerm, 500);

  useEffect(() => {
    handleTitleUpdate(debouncedTitleTerm);
  }, [debouncedTitleTerm, handleTitleUpdate]);

  useEffect(() => {
    handleBodyUpdate(debouncedBodyTerm);
  }, [debouncedBodyTerm, handleBodyUpdate]);

  return (
    note && (
      <div className={styles.container}>
        <TextArea
          onChange={(e) => setUpdatedTitleTerm(e?.currentTarget?.value)}
          defaultValue={updatedTitleTerm}
          placeholder={"Введите заголовок"}
          view={"clear"}
          size={"l"}
          className={styles.title}
        />
        <TextArea
          onChange={(e) => setUpdatedBodyTerm(e?.currentTarget?.value)}
          defaultValue={updatedBodyTerm}
          placeholder={"Введите текст"}
          view={"clear"}
          size={"m"}
        />
      </div>
    )
  );
};
