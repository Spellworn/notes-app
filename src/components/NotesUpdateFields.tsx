import { type ChangeEvent } from "react";
import { notesRules } from "../redux/noteRules.ts";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { selectNoteById, updateNote } from "../redux/notesSlice.ts";
import type { NoteId } from "../redux/Note.ts";

interface NotesUpdateFieldsProps {
  id: NoteId | undefined;
}

// type PayloadType = Partial<Notes> & { id: NoteId | undefined };

export const NotesUpdateFields = ({ id }: NotesUpdateFieldsProps) => {
  const dispatch = useAppDispatch();
  // const [editTerm, setEditTerm] = useState<PayloadType>({
  //   id: id,
  //   body: undefined,
  //   title: undefined,
  // });
  // const debouncedEditTerm = useDebounce<PayloadType>(editTerm, 0);

  const note = useAppSelector(selectNoteById(id));

  // TODO: прям дебаунс
  const handleNoteUpdate = (
    e: ChangeEvent<HTMLTextAreaElement>,
    updateVariant: "title" | "body",
  ) => {
    if (id && note) {
      console.log(e.currentTarget.value);
      const payload = notesRules.handleUpdate(note, {
        id,
        body: updateVariant === "body" ? e.currentTarget.value : undefined,
        title: updateVariant === "title" ? e.currentTarget.value : undefined,
      });
      if (payload) {
        dispatch(updateNote(payload));
      }
    }
  };

  // useEffect(() => {
  //   if (id) {
  //     dispatch(updateNote(debouncedEditTerm));
  //   }
  // }, [debouncedEditTerm, dispatch, id]);
  // // console.log(note);

  return (
    note && (
      <>
        <textarea
          onChange={(e) => handleNoteUpdate(e, "title")}
          // value={note.title}
          placeholder={"Введите заголовок"}
        />
        <textarea
          onChange={(e) => handleNoteUpdate(e, "body")}
          // value={note.body}
          placeholder={"Введите текст"}
        />
      </>
    )
  );
};
