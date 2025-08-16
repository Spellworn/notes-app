import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import {
  selectNoteById,
  updateBody,
  updateTitle,
} from "../redux/notesSlice.ts";
import type { NoteId } from "../redux/Note.ts";
import { useDebounce } from "../hooks/useDebounce.ts";

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
      <>
        <textarea
          onChange={(e) => setUpdatedTitleTerm(e?.currentTarget?.value)}
          defaultValue={updatedTitleTerm}
          placeholder={"Введите заголовок"}
        />
        <textarea
          onChange={(e) => setUpdatedBodyTerm(e?.currentTarget?.value)}
          defaultValue={updatedBodyTerm}
          placeholder={"Введите текст"}
        />
      </>
    )
  );
};
