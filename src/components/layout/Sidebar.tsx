import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Folder, Tag, File, ChevronDown, ChevronRight, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useNotes from '@/hooks/useNotes';
import { useSidebarStore } from '@/store/sidebarState';
import { cn } from '@/lib/utils';

export default function Sidebar() {
    const navigate = useNavigate();
    const { folders } = useNotes();
    const [expanded, setExpanded] = useState(true);
    const { isOpen, toggle } = useSidebarStore();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <>
            {/* Mobile overlay */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={toggle}
                />
            )}

            <aside
                className={cn(
                    'fixed md:sticky top-0 bottom-0 left-0 z-40',
                    'w-[240px] bg-zinc-900',
                    'transition-transform duration-300 ease-in-out',
                    isMobile && !isOpen && '-translate-x-full',
                    !isMobile && !isOpen && 'w-[50px]',
                    'flex flex-col h-[calc(100vh-64px)]' // Subtract header height
                )}
            >
                {!isMobile && (
                    <div className="p-2 flex justify-end">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggle}
                            className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                        >
                            {isOpen ? (
                                <PanelLeftClose className="h-4 w-4" />
                            ) : (
                                <PanelLeftOpen className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                )}

                <ScrollArea className="flex-1 px-3">
                    <div className="space-y-2 p-2">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800"
                            onClick={() => navigate('/')}
                        >
                            <File className="h-4 w-4 mr-2" />
                            {(isOpen || isMobile) && 'All Notes'}
                        </Button>

                        <div className="space-y-1">
                            <div
                                className="flex items-center py-2 px-2 text-zinc-400 cursor-pointer"
                                onClick={() => setExpanded(!expanded)}
                            >
                                {expanded ? (
                                    <ChevronDown className="h-4 w-4 mr-1" />
                                ) : (
                                    <ChevronRight className="h-4 w-4 mr-1" />
                                )}
                                {(isOpen || isMobile) && (
                                    <span className="text-sm font-medium">Folders</span>
                                )}
                            </div>

                            {expanded && (isOpen || isMobile) && (
                                <div className="ml-4 space-y-1">
                                    {folders.map((folder) => (
                                        <Button
                                            key={folder.id}
                                            variant="ghost"
                                            className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800"
                                            onClick={() => navigate(`/folder/${folder.id}`)}
                                        >
                                            <Folder className="h-4 w-4 mr-2" />
                                            {folder.name}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center py-2 px-2 text-zinc-400">
                                <Tag className="h-4 w-4 mr-2" />
                                {(isOpen || isMobile) && (
                                    <span className="text-sm font-medium">Tags</span>
                                )}
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </aside>
        </>
    );
}