import { Tldraw } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import { Card } from '@/components/ui/card'
import { useCallback, useState, useEffect } from 'react'

interface DrawingBoardProps {
    onSave: (drawings: any) => void;
    className?: string;
}

export const DrawingBoard: React.FC<DrawingBoardProps> = ({ onSave, className }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleMount = useCallback((editor: any) => {
        editor.store.listen(() => {
            const snapshot = editor.store.getSnapshot()
            onSave(snapshot)
        })
    }, [onSave])

    return (
        <Card className={`flex flex-col bg-white overflow-hidden ${className}`}>
            <div className={`flex-1 ${isMobile ? 'h-[60vh]' : 'h-[calc(100vh-80px)]'}`}>
                <Tldraw
                    onMount={handleMount}
                    hideUi={isMobile}
                    inferDarkMode={false}
                    className="rounded-lg"
                />
            </div>
        </Card>
    );
};