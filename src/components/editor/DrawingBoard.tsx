import { Tldraw, Editor } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import { Card } from '@/components/ui/card'
import { useCallback } from 'react'

interface DrawingBoardProps {
    onSave: (drawings: any) => void;
}

export const DrawingBoard: React.FC<DrawingBoardProps> = ({ onSave }) => {
    const handleMount = useCallback((editor: Editor) => {
        // Subscribe to changes
        editor.store.listen(() => {
            const snapshot = editor.store.getSnapshot()
            onSave(snapshot)
        })
    }, [onSave])

    return (
        <Card className="p-4 h-full">
            <div className="h-[calc(100%-40px)]">
                <Tldraw
                    onMount={handleMount}
                />
            </div>
        </Card>
    );
};