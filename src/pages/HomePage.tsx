import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import useNotes from '@/hooks/useNotes';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistance } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const { notes } = useNotes();
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex">
                <Sidebar />
                <main className="flex-1 p-6 bg-gray-50">
                    <h2 className="text-2xl font-semibold mb-4">All Notes</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {notes.map(note => (
                            <Card
                                key={note.id}
                                className="cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => navigate(`/note/${note.id}`)}
                            >
                                <CardHeader>
                                    <CardTitle>{note.title}</CardTitle>
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
