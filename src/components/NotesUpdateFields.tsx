import { type ChangeEvent, useEffect, useState } from "react";
import { notesRules } from "../redux/noteRules.ts";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { adapterSelectors, updateNote } from "../redux/notesSlice.ts";
import type { NoteId, Notes } from "../redux/Note.ts";
import { useDebounce } from "../hooks/useDebounce.ts";

interface NotesUpdateFieldsProps {
  id: NoteId | undefined;
}

type PayloadType = Partial<Notes> & { id: NoteId | undefined };

export const NotesUpdateFields = ({ id }: NotesUpdateFieldsProps) => {
  const dispatch = useAppDispatch();
  const [editTerm, setEditTerm] = useState<PayloadType>({
    id: id,
    body: undefined,
    title: undefined,
  });
  const debouncedEditTerm = useDebounce<PayloadType>(editTerm, 10);

  const note = useAppSelector((state) =>
    // TODO: написать кастомный селектор для айди
    adapterSelectors.selectById(state, id!),
  );

  // TODO: прям дебаунс
  const handleNoteUpdate = (
    e: ChangeEvent<HTMLTextAreaElement>,
    updateVariant: "title" | "body",
  ) => {
    if (id) {
      const payload = notesRules.handleUpdate(note, {
        id,
        body: updateVariant === "body" ? e.currentTarget.value : undefined,
        title: updateVariant === "title" ? e.currentTarget.value : undefined,
      });
      if (payload) {
        setEditTerm(payload);
      }
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(updateNote(debouncedEditTerm));
    }
  }, [debouncedEditTerm, dispatch, id]);

  return (
    note && (
      <>
        <textarea
          onChange={(e) => handleNoteUpdate(e, "title")}
          value={note.title}
          placeholder={"Введите заголовок"}
        />
        <textarea
          onChange={(e) => handleNoteUpdate(e, "body")}
          value={note.body}
          placeholder={"Введите текст"}
        />
      </>
    )
  );
};
