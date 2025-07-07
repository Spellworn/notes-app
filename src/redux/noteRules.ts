import type { NoteId, Notes, UpdateDataAction } from "./Note.ts";

const handleUpdate = (
  note: Notes,
  { id, body, title }: Partial<UpdateDataAction>,
): (Partial<Notes> & { id: NoteId }) | undefined => {
  if (id) {
    const res: Partial<Notes> = { id };
    if (note) {
      if (title) {
        res.title = title;
      }
      if (body) {
        res.body = body;
      }
    }

    return { id, ...res };
  }

  return undefined;
};

export const notesRules = {
  handleUpdate,
};
