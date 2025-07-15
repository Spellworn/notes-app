import { type ChangeEvent, useEffect, useState } from "react";
import { notesRules } from "../redux/noteRules.ts";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { selectNoteById, updateNote } from "../redux/notesSlice.ts";
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
  const debouncedEditTerm = useDebounce<PayloadType>(editTerm, 100);

  const note = useAppSelector(selectNoteById(id));

  // TODO: прям дебаунс
  const handleNoteUpdate = (
    e: ChangeEvent<HTMLTextAreaElement>,
    updateVariant: "title" | "body",
  ) => {
    if (id && note) {
      const payload = notesRules.handleUpdate(note, {
        id,
        body: updateVariant === "body" ? e.currentTarget.value : "",
        title: updateVariant === "title" ? e.currentTarget.value : "",
      });
      if (payload) {
        setEditTerm(payload);
      }
    }
  };

  useEffect(() => {
    if (id) {
      console.log("фак");
      dispatch(updateNote(debouncedEditTerm));
    }
  }, [debouncedEditTerm, dispatch, editTerm.body, editTerm.title, id]);
  // console.log(note);

  return (
    note && (
      <>
        <textarea
          onChange={(e) => handleNoteUpdate(e, "title")}
          defaultValue={note.title}
          placeholder={"Введите заголовок"}
        />
        <textarea
          onChange={(e) => handleNoteUpdate(e, "body")}
          defaultValue={note.body}
          placeholder={"Введите текст"}
        />
      </>
    )
  );
};
