import { Folder, Note } from "@/types";
import useLocalStorage from "./useLocalStorage";

export default function UseNotes() {
    const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
    const [folders, setFolder] = useLocalStorage<Folder[]>('folders', []);

    const addNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newNote: Note = {
            ...note,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            tags: note.tags || [],
        };

        setNotes([...notes, newNote]);
        return newNote;
    };

    const updateNote = (id: string, updates: Partial<Note>) => {
        setNotes(notes.map(note =>
            note.id === id
                ? { ...note, ...updates, updatedAt: new Date() }
                : note
        ));
    };

    const deleteNote = (id: string) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const addFolder = (name: string) => {
        const newFolder: Folder = {
            id: crypto.randomUUID(),
            name,
            createdAt: new Date(),
        };
        setFolder([...folders, newFolder]);
        return newFolder;
    };

    return {
        notes,
        folders,
        addNote,
        updateNote,
        deleteNote,
        addFolder
    };
};