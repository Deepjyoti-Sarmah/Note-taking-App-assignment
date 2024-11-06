import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Folder,
    Tag,
    File,
    ChevronDown,
    ChevronRight,
    PanelLeftClose,
    PanelLeftOpen
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useNotes from '@/hooks/useNotes';
import { useSidebarStore } from '@/store/sidebarState';
import { cn } from '@/lib/utils';

export default function Sidebar() {
    const navigate = useNavigate();
    const { folders, notes } = useNotes();
    const [expanded, setExpanded] = useState(true);
    const { isOpen, toggle } = useSidebarStore();

    return (
        <div className={cn(
            "border-r h-full bg-white transition-all duration-300",
            isOpen ? "w-64" : "w-[50px]"
        )}>
            <div className="p-2 flex justify-end text-white">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggle}
                >
                    {isOpen ? (
                        <PanelLeftClose className="h-4 w-4" />
                    ) : (
                        <PanelLeftOpen className="h-4 w-4" />
                    )}
                </Button>
            </div>

            {isOpen && (
                <ScrollArea className="h-[calc(100%-40px)]">
                    <div className="p-4 space-y-4">
                        <Button
                            variant="ghost"
                            className="w-full text-white justify-start"
                            onClick={() => navigate('/')}
                        >
                            <File className="w-4 h-4 mr-2" />
                            All Notes
                        </Button>

                        <div>
                            <div
                                className="flex items-center mb-2 cursor-pointer"
                                onClick={() => setExpanded(!expanded)}
                            >
                                {expanded ? (
                                    <ChevronDown className="w-4 h-4" />
                                ) : (
                                    <ChevronRight className="w-4 h-4" />
                                )}
                                <span className="font-medium">Folders</span>
                            </div>

                            {expanded && folders.map(folder => (
                                <Button
                                    key={folder.id}
                                    variant="ghost"
                                    className="w-full justify-start pl-6"
                                    onClick={() => navigate(`/folder/${folder.id}`)}
                                >
                                    <Folder className="w-4 h-4 mr-2" />
                                    {folder.name}
                                </Button>
                            ))}
                        </div>

                        <div>
                            <div className="flex items-center mb-2">
                                <Tag className="w-4 h-4 mr-2" />
                                <span className="font-medium">Tags</span>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            )}
        </div>
    );
};