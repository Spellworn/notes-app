export type NoteId = string;

export interface Notes {
  id: NoteId;
  title: string | undefined;
  body: string | undefined;
  date: string;
  folder: string;
}

export interface Data {
  posts: Notes[];
  total: number;
  skip: number;
  limit: number;
}

export interface UpdateDataAction {
  id: NoteId | undefined;
  text: string | undefined;
}

export interface NoteAdd {
  id: NoteId;
  folder: string;
}
