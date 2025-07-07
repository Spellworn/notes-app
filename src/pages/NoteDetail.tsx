import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks.ts";
import { noteDeleted, noteUpdated, selectNotes } from "../redux/notesSlice.ts";
import * as React from "react";

export const NoteDetail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const notes = useAppSelector(selectNotes);
  const note = notes.find((note) => note.id === id);

  if (!note || !id) {
    return <span>Заметка не найдена</span>;
  }

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(noteUpdated({ id, text: e.currentTarget.value, title: true }));
  };
  const handleChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(noteUpdated({ id, text: e.currentTarget.value, title: false }));
  };

  const handleDeleteNote = () => {
    dispatch(noteDeleted(id));
    navigate("/");
  };

  const handleReturn = () => {
    if (!note.title && !note.body) {
      handleDeleteNote();
    }
    navigate("/");
  };

  const handlePopState = () => {
    if (!note.title && !note.body) {
      handleDeleteNote();
    }
  };

  window.addEventListener("popstate", handlePopState);

  return (
    <div>
      <textarea
        onChange={handleChangeTitle}
        value={note.title}
        placeholder={"Введите заголовок"}
      />
      <textarea
        onChange={handleChangeBody}
        value={note.body}
        placeholder={"Введите текст"}
      />

      <button onClick={handleReturn}> Обратно вернуца </button>
      <button onClick={handleDeleteNote}> удалить </button>
    </div>
  );
};
