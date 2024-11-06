import { Button } from '@/components/ui/button';
import { PlusCircle, Settings, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import { Input } from '../ui/input';

export default function Header() {
    const navigate = useNavigate();

    return (
        <header className="border-b p-4 flex justify-between items-center bg-white">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">
                    <a href='/' className='text-black hover:text-black'>
                        Notes App
                    </a>
                </h1>
                {/* <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search notes..."
                        className="pl-8 w-[300px]"
                    />
                </div> */}
            </div>
            <div className="flex gap-2">
                <Button
                    variant="default"
                    size="sm"
                    onClick={() => navigate('/new')}
                >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    New Note
                </Button>
                {/* <Button
                    variant="default"
                    size="sm"
                    onClick={() => navigate('/settings')}
                >
                    <Settings className="w-4 h-4 " />
                </Button> */}
            </div>
        </header>
    );
};
