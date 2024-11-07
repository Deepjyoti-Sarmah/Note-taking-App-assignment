import { DrawingBoard } from "@/components/editor/DrawingBoard";
import { QuillEditor } from "@/components/editor/QuillEditor";
import RootLayout from "@/components/layout/RootLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import UseNotes from "@/hooks/useNotes";
import { useSidebarStore } from "@/store/sidebarState";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

export default function NotePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { notes, addNote, updateNote } = UseNotes();
    const { toggle } = useSidebarStore();
    const [isMobile, setIsMobile] = useState(false);
    const [isDrawingOpen, setIsDrawingOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [drawings, setDrawings] = useState<any>([]);
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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
        <RootLayout>
            <div className="h-full overflow-auto bg-zinc-50">
                <div className="max-w-[1600px] w-full mx-auto p-4 md:p-6">
                    <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex items-center gap-2 flex-1">
                            {isMobile && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggle}
                                    className="md:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            )}
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Note title"
                                className="text-lg md:text-xl"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={handleSave}
                                className="flex-1 md:flex-none"
                            >
                                Save
                            </Button>
                            <Button
                                variant={isPreviewMode ? 'default' : 'outline'}
                                onClick={() => setIsPreviewMode(!isPreviewMode)}
                                className="flex-1 md:flex-none"
                            >
                                {isPreviewMode ? 'Edit' : 'Preview'}
                            </Button>
                        </div>
                    </div>

                    <div className={cn(
                        "grid gap-6",
                        isDrawingOpen ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
                    )}>
                        <div className={cn(
                            "min-h-[calc(100vh-16rem)]",
                            !isDrawingOpen && !isMobile && "lg:w-[70%]"
                        )}>
                            {(!isPreviewMode || !isMobile) && (
                                <QuillEditor
                                    value={content}
                                    onChange={setContent}
                                    className="h-full"
                                />
                            )}
                            {isPreviewMode && (
                                <div className="prose prose-sm md:prose-base max-w-none bg-white rounded-lg border p-4 min-h-[calc(100vh-16rem)] overflow-auto">
                                    <h1>{title}</h1>
                                    <div dangerouslySetInnerHTML={{ __html: content }} />
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <Sheet open={isDrawingOpen} onOpenChange={setIsDrawingOpen}>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "transition-all duration-300",
                                            !isDrawingOpen && !isMobile && "w-40"
                                        )}
                                    >
                                        Open Drawing Board
                                    </Button>
                                </SheetTrigger>
                                <SheetContent
                                    side={isMobile ? "bottom" : "right"}
                                    className={cn(
                                        "bg-white",
                                        isMobile ? "h-[80vh] p-4" : "w-[90%] max-w-[800px]"
                                    )}
                                >
                                    <SheetHeader>
                                        <SheetTitle>Drawing Board</SheetTitle>
                                    </SheetHeader>
                                    <div className="mt-4 h-[calc(100%-60px)]">
                                        <DrawingBoard
                                            onSave={setDrawings}
                                            className="h-full"
                                        />
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </RootLayout>
    );
}