export type NoteId = string;

export interface Notes {
  id: NoteId;
  title: string | undefined;
  body: string | undefined;
  date: string;
}

export interface Data {
  posts: Notes[];
  total: number;
  skip: number;
  limit: number;
}

export interface UpdateDataAction {
  id: NoteId;
  body: string;
  title: string;
}
