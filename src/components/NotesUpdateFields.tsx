import { type ChangeEvent } from "react";
import { notesRules } from "../redux/noteRules.ts";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { adapterSelectors, notesActions } from "../redux/notesSlice.ts";
import type { NoteId } from "../redux/Note.ts";

interface NotesUpdateFieldsProps {
  id: NoteId | undefined;
}

export const NotesUpdateFields = ({ id }: NotesUpdateFieldsProps) => {
  const dispatch = useAppDispatch();

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
        dispatch(notesActions.updateNote(payload));
      }
    }
  };

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
