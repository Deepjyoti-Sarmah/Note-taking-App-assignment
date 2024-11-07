import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    return (
        <header className=" top-0 w-full border-b">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl md:text-2xl font-bold">
                        <a href='/' className='text-black hover:text-black'>
                            Notes App
                        </a>
                    </h1>
                </div>
                <Button
                    variant="default"
                    size="sm"
                    onClick={() => navigate('/new')}
                    className="whitespace-nowrap"
                >
                    <PlusCircle className="w-4 h-4 mr-2 hidden sm:inline-block" />
                    New Note
                </Button>
            </div>
        </header>
    );
}