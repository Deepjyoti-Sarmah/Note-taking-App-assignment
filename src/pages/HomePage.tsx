import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import useNotes from '@/hooks/useNotes';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistance } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useSidebarStore } from '@/store/sidebarState';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export const HomePage = () => {
    const { notes } = useNotes();
    const navigate = useNavigate();
    const { isOpen, toggle } = useSidebarStore();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768 && isOpen) {
                toggle();
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [isOpen, toggle]);

    return (
        <div className="h-screen w-screen m-auto flex flex-col">
            <Header />
            <div className="flex-1 flex">
                <Sidebar />
                <main className={cn(
                    "flex-1 p-4 md:p-6 bg-background transition-all duration-300",
                    isOpen ? "md:ml-64" : "md:ml-[50px]",
                    isMobile ? "ml-0" : ""
                )}>
                    <div className="flex items-center gap-2 mb-4">
                        {isMobile && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggle}
                                className="md:hidden text-white"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        )}
                        <h2 className="text-xl md:text-2xl font-semibold">All Notes</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {notes.map(note => (
                            <Card
                                key={note.id}
                                className="cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => navigate(`/note/${note.id}`)}
                            >
                                <CardHeader>
                                    <CardTitle className="line-clamp-1">{note.title}</CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        Updated {formatDistance(new Date(note.updatedAt), new Date(), { addSuffix: true })}
                                    </p>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};
