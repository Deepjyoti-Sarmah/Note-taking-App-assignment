import { DrawingBoard } from "@/components/editor/DrawingBoard";
import { QuillEditor } from "@/components/editor/QuillEditor";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import UseNotes from "@/hooks/useNotes";
import { useSidebarStore } from "@/store/sidebarState";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function NotePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { notes, addNote, updateNote } = UseNotes();
    const { isOpen } = useSidebarStore();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [drawings, setDrawings] = useState<any>([]);
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    useEffect(() => {
        if (id) {
            const note = notes.find(x => x.id === id);
            if (note) {
                setTitle(note.title);
                setContent(note.content);
                setDrawings(note.drawings);
            }
        }
    }, [id, notes]);

    const handleSave = () => {
        if (id) {
            updateNote(id, { title, content, drawings });
        } else {
            const newNote = addNote({
                title, content, drawings,
                tags: []
            });
            navigate(`/note/${newNote.id}`);
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex">
                <Sidebar />
                <main className={cn(
                    "flex-1 p-6 bg-gray-50 transition-all duration-300",
                    isOpen ? "" : "ml-[50px]"
                )}>
                    <div className="mb-4 flex items-center justify-between">
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Note title"
                            className="text-2xl font-semibold w-[300px]"
                        />
                        <div className="flex text-white items-center gap-2">
                            <Button onClick={handleSave}>Save</Button>
                            <Button
                                variant={isPreviewMode ? 'default' : 'ghost'}
                                onClick={() => setIsPreviewMode(!isPreviewMode)}
                            >
                                Preview
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {isPreviewMode ? (
                            <div className="prose max-w-none">
                                <h1>{title}</h1>
                                <div dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                        ) : (
                            <QuillEditor value={content} onChange={setContent} />
                        )}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="w-full">
                                    Open Drawing Board
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-3/4">
                                <SheetHeader>
                                    <SheetTitle>Drawing Board</SheetTitle>
                                </SheetHeader>
                                <DrawingBoard onSave={setDrawings} />
                            </SheetContent>
                        </Sheet>
                    </div>
                </main>
            </div>
        </div>
    );
}