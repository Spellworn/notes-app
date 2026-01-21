export type FolderId = string;
export type FolderName = string;
export type CurrentFolderType = string | undefined;

export interface FolderType {
  folderName: FolderName;
  id: FolderId;
}
