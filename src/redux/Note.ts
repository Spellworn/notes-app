export type NoteId = string;

// говорил вроде уже, типы лучше писать рядом с местом где они юзаюца(можно и в отдельном файле) (ТАК ТЫ САМ НАФИК ТАК СДЕЛАЛ ОТДЕЛЬНА ВЫНЕС)

export interface Notes {
  id: NoteId;
  title: string | undefined;
  body: string | undefined;
  date: string;
  folder: string | undefined;
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

export interface UpdateFolderAction {
  id: NoteId | undefined;
  folder: string | undefined;
}

export interface NoteAdd {
  id: NoteId;
  folder: string | undefined;
}
