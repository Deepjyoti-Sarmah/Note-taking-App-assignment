export interface Note {
    id: string;
    title: string;
    content: string;
    drawings: any[];
    createdAt: Date;
    updatedAt: Date;
    folderId?: string;
    tags: string[];
}

export interface Folder {
    id: string;
    name: string;
    createdAt: Date;
}