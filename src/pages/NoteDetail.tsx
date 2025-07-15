import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { deleteNote, selectExistingId } from "../redux/notesSlice.ts";
import type { NoteId } from "../redux/Note.ts";
import { NotesUpdateFields } from "../components/NotesUpdateFields.tsx";

export const NoteDetail = () => {
  const { id } = useParams<NoteId>();
  const existingId = useAppSelector(selectExistingId(id));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDeleteNote = useCallback(() => {
    if (id) {
      dispatch(deleteNote(id));
      navigate("/");
    }
  }, [dispatch, id, navigate]);

  // TODO: сделать фильтр на пустые заметки
  // useEffect(() => {
  //   const handleReset = () => {
  //     if (isEmpty && isEmptyRef.current !== isEmpty) {
  //       handleDeleteNote();
  //       isEmptyRef.current = isEmpty;
  //     }
  //   };
  //
  //   return () => {
  //     handleReset();
  //   };
  // }, [handleDeleteNote, isEmpty]);

  return (
    <div>
      {!existingId && (
        <>
          <h1>Заметка не фурычит</h1>
          <button onClick={() => navigate("/")}> Обратно вернуца</button>
        </>
      )}
      {existingId && (
        <>
          <NotesUpdateFields id={id} />
          <button onClick={() => navigate("/")}> Обратно вернуца</button>
          <button onClick={handleDeleteNote}> удалить</button>
        </>
      )}
    </div>
  );
};
